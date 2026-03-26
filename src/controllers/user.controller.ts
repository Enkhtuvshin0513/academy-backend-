import type { Request, Response } from "express";
import * as userService from "../services/user.service.js";

// POST /api/auth/register
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Name, email and password are required" });
      return;
    }

    const user = await userService.registerUser(name, email, password);
    res.status(201).json({ success: true, message: "Registered successfully", data: user });
  } catch (error: any) {
    if (error.message === "Email already in use") {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

// POST /api/auth/login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required" });
      return;
    }

    const data = await userService.loginUser(email, password);
    res.json({ success: true, message: "Login successful", data });
  } catch (error: any) {
    if (error.message === "Invalid email or password") {
      res.status(401).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

// GET /api/users/me
export async function getMe(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(req.user!.userId);
    res.json({ success: true, data: user });
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

// GET /api/users
export async function getAll(req: Request, res: Response) {
  try {
    const page  = Number(req.query["page"])  || 1;
    const limit = Number(req.query["limit"]) || 10;

    const result = await userService.getAllUsers(page, limit);
    res.json({ success: true, data: result.users, meta: result.meta });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// GET /api/users/:id
export async function getById(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(req.params["id"]!);
    res.json({ success: true, data: user });
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

// DELETE /api/users/:id
export async function deleteUser(req: Request, res: Response) {
  try {
    await userService.deleteUser(req.params["id"]!);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}
