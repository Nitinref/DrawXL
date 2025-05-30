"use client";
import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

// Shape types with `id`
type Shape = {
  id: string;
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
} | {
  id: string;
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
} | {
  id: string;
  type: "line";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
} | {
  id: string;
  type: "pencil";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
} | {
  id: string;
  type: "text";
  x:number,
  y:number,
  content:string
} | {
  id: string;
  type: "erase";
};

export class Game {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private selectedTool: Tool = "circle";
  private lastX: number = 0;
  private lastY: number = 0;

  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: "circle" | "rect" | "pencil" | "line" | "eraser"|"text") {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      } else if (message.type === "erase") {
        const { id } = JSON.parse(message.message);
        this.existingShapes = this.existingShapes.filter(shape => shape.id !== id);
        this.clearCanvas();
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.forEach((shape) => {
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "line" || shape.type === "pencil") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
        this.ctx.closePath();
      }else if (shape.type === "text") {
  this.ctx.fillStyle = "white";
  this.ctx.font = "16px sans-serif";
  this.ctx.fillText(shape.content, shape.x, shape.y);
}

    });
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  createTextInput(x: number, y: number) {
  const input = document.createElement("input");
  input.type = "text";
  input.style.position = "absolute";
  input.style.left = `${x}px`;
  input.style.top = `${y}px`;
  input.style.background = "transparent";
  input.style.color = "white";
  input.style.font = "16px sans-serif";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.zIndex = "10";

  document.body.appendChild(input);
  input.focus();

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const value = input.value.trim();
      if (value) {
        const shape = {
          type: "text",
          x,
          y: y + 16, 
          content: value
        } as Shape;

        this.existingShapes.push(shape);
        this.clearCanvas();

        this.socket.send(JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        }));
      }

      input.remove();
      input.removeEventListener("keydown", onEnter);
    }
  };

  input.addEventListener("keydown", onEnter);
}


  mouseDownHandler = (e: { clientX: number; clientY: number; }) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

      if (this.selectedTool === "text") {
    this.createTextInput(e.clientX, e.clientY);
    return;
  }

    if (this.selectedTool === "pencil") {
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    }
  }

  mouseUpHandler = async (e: { clientX: number; clientY: number; }) => {
    this.clicked = false;

    if (this.selectedTool === "eraser") {
  
      return;
    }

    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    let shape: Shape | null = null;
    const id = this.generateId();

    if (this.selectedTool === "rect") {
      shape = {
        id,
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (this.selectedTool === "circle") {
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      shape = {
        id,
        type: "circle",
        radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    } else if (this.selectedTool === "line") {
      shape = {
        id,
        type: "line",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY,
      };
    }

    if (!shape) return;

    this.existingShapes.push(shape);
    this.clearCanvas();

    
    this.socket.send(JSON.stringify({
      type: "chat",
      message: JSON.stringify({ shape }),
      roomId: this.roomId,
    }));
  }

  mouseMoveHandler = async (e: { clientX: number; clientY: number; }) => {
    if (!this.clicked) return;

    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    this.clearCanvas();
    this.ctx.strokeStyle = "rgba(255, 255, 255)";

    if (this.selectedTool === "rect") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.selectedTool === "circle") {
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      const centerX = this.startX + radius;
      const centerY = this.startY + radius;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.selectedTool === "line") {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.selectedTool === "pencil") {
      const shape: Shape = {
        id: this.generateId(),
        type: "pencil",
        startX: this.lastX,
        startY: this.lastY,
        endX: e.clientX,
        endY: e.clientY,
      };

      this.existingShapes.push(shape);

      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
      this.ctx.closePath();

      this.lastX = e.clientX;
      this.lastY = e.clientY;

      this.socket.send(JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId: this.roomId,
      }));

     
    } else if (this.selectedTool === "eraser") {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const eraserRadius = 10;


      const shapesToErase = this.existingShapes.filter(shape => {
        if (shape.type === "pencil") {
          const dist = Math.hypot(shape.startX - currentX, shape.startY - currentY);
          return dist <= eraserRadius;
        } else if (shape.type === "circle") {
          const dist = Math.hypot(shape.centerX - currentX, shape.centerY - currentY);
          return dist <= shape.radius + eraserRadius;
        } else if (shape.type === "rect") {
          return currentX >= shape.x - eraserRadius &&
                 currentX <= shape.x + shape.width + eraserRadius &&
                 currentY >= shape.y - eraserRadius &&
                 currentY <= shape.y + shape.height + eraserRadius;
        } else if (shape.type === "line") {
          // Approximate point-to-line distance
          const { startX, startY, endX, endY } = shape;
          const A = currentX - startX;
          const B = currentY - startY;
          const C = endX - startX;
          const D = endY - startY;

          const dot = A * C + B * D;
          const len_sq = C * C + D * D;
          let param = -1;
          if (len_sq !== 0) param = dot / len_sq;

          let xx, yy;

          if (param < 0) {
            xx = startX;
            yy = startY;
          } else if (param > 1) {
            xx = endX;
            yy = endY;
          } else {
            xx = startX + param * C;
            yy = startY + param * D;
          }

          const dist = Math.hypot(currentX - xx, currentY - yy);
          return dist <= eraserRadius;
        }
        return false;
      });

      for (const shape of shapesToErase) {
    
        this.existingShapes = this.existingShapes.filter(s => s.id !== shape.id);
        this.clearCanvas();

        this.socket.send(JSON.stringify({
          type: "erase",
          message: JSON.stringify({ id: shape.id }),
          roomId: this.roomId,
        }));

    
      }
    }
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
