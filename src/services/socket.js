import { io } from "socket.io-client"

// For production, use your actual Socket.IO server URL
const SOCKET_URL = "http://localhost:3001"

let socket = null

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: false,
    })
  }
  return socket
}

export const getSocket = () => {
  if (!socket) {
    return initSocket()
  }
  return socket
}

export const connectSocket = () => {
  const socket = getSocket()
  if (!socket.connected) {
    socket.connect()
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect()
  }
}

// Mock Socket.IO for demo purposes (since we don't have a real server)
export class MockSocket {
  constructor() {
    this.listeners = {}
    this.connected = false
    this.roomComments = {}
  }

  connect() {
    this.connected = true
    setTimeout(() => {
      this.emit("connect", null)
    }, 100)
    return this
  }

  disconnect() {
    this.connected = false
    this.emit("disconnect", null)
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data))
    }

    // Simulate server responses
    if (event === "join-class") {
      const comments = this.roomComments[data.classId] || []
      setTimeout(() => {
        this.emit("class-history", comments)
      }, 100)
    }

    if (event === "new-comment") {
      if (!this.roomComments[data.classId]) {
        this.roomComments[data.classId] = []
      }
      const comment = {
        ...data.comment,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      this.roomComments[data.classId].push(comment)
      setTimeout(() => {
        this.emit("comment-received", comment)
      }, 100)
    }

    if (event === "delete-comment") {
      if (this.roomComments[data.classId]) {
        this.roomComments[data.classId] = this.roomComments[data.classId].filter((c) => c.id !== data.commentId)
        setTimeout(() => {
          this.emit("comment-deleted", { commentId: data.commentId })
        }, 100)
      }
    }
  }
}

// Export mock socket for demo
export const getMockSocket = () => new MockSocket()
