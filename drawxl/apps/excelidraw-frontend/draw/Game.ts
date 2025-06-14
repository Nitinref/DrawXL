
"use client";

import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

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
  x: number,
  y: number,
  content: string
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
  private offsetX: number = 0;
  private offsetY: number = 0;
  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;

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

  setTool(tool: "circle" | "rect" | "pencil" | "line" | "eraser" | "text" | "pan") {
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
  this.ctx.fillStyle = "rgba(255,255,255)";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.existingShapes.forEach((shape) => {
    this.ctx.strokeStyle = "rgba(0,0,0)";
    if (shape.type === "rect") {
      this.ctx.strokeRect(
        shape.x + this.offsetX,
        shape.y + this.offsetY,
        shape.width,
        shape.height
      );
    } else if (shape.type === "circle") {
      this.ctx.beginPath();
      this.ctx.arc(
        shape.centerX + this.offsetX,
        shape.centerY + this.offsetY,
        Math.abs(shape.radius),
        0,
        Math.PI * 2
      );
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (shape.type === "line" || shape.type === "pencil") {
      this.ctx.beginPath();
      this.ctx.moveTo(shape.startX + this.offsetX, shape.startY + this.offsetY);
      this.ctx.lineTo(shape.endX + this.offsetX, shape.endY + this.offsetY);
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (shape.type === "text") {
      this.ctx.fillStyle = "black";
      this.ctx.font = "16px sans-serif";
      this.ctx.fillText(shape.content, shape.x + this.offsetX, shape.y + this.offsetY);
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
    input.style.color = "black";
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
    } if (this.selectedTool === "pan") {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.offsetX;
      this.dragStartY = e.clientY - this.offsetY;
      return;
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
    if (this.selectedTool === "pan") {
      this.isDragging = false;
      return;
    }
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
    this.ctx.strokeStyle = "rgba(0,0,0)";
    if (this.selectedTool === "pan" && this.isDragging) {
      this.offsetX = e.clientX - this.dragStartX;
      this.offsetY = e.clientY - this.dragStartY;
      this.clearCanvas();
      return;
    }
    else if (this.selectedTool === "rect") {
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
          return (
            currentX >= shape.x &&
            currentX <= shape.x + shape.width &&
            currentY >= shape.y &&
            currentY <= shape.y + shape.height
          );
        } else if (shape.type === "line") {
          // Check if point is near the line segment
          const distToLine = (x1: number, y1: number, x2: number, y2: number, px: number, py: number) => {
            const A = px - x1;
            const B = py - y1;
            const C = x2 - x1;
            const D = y2 - y1;

            const dot = A * C + B * D;
            const lenSq = C * C + D * D;
            let param = -1;
            if (lenSq !== 0) param = dot / lenSq;

            let xx, yy;
            if (param < 0) {
              xx = x1;
              yy = y1;
            } else if (param > 1) {
              xx = x2;
              yy = y2;
            } else {
              xx = x1 + param * C;
              yy = y1 + param * D;
            }

            const dx = px - xx;
            const dy = py - yy;
            return Math.sqrt(dx * dx + dy * dy);
          };

          return distToLine(shape.startX, shape.startY, shape.endX, shape.endY, currentX, currentY) <= eraserRadius;
        }

        return false;
      });

      for (const shape of shapesToErase) {
        this.existingShapes = this.existingShapes.filter(s => s.id !== shape.id);
        this.socket.send(JSON.stringify({
          type: "erase",
          message: JSON.stringify({ id: shape.id }),
          roomId: this.roomId,
        }));
      }

      this.clearCanvas();
    }
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}  