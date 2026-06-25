import { Router } from "express";

export const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check API health
 *     responses:
 *       200:
 *         description: API is running
 */
healthRouter.get("/", (_request, response) => {
    response.status(200).json({
        success: true,
        message: "FlowDesk API is running",
        timestamp: new Date().toISOString()
    });
});