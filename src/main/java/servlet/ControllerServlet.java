package servlet;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
public class ControllerServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        send(request, response);
    }
    public void send(HttpServletRequest request, HttpServletResponse response) throws IOException , ServletException {
        final String ERROR = "Invalid coordinates!";

        try {
            if (request.getParameter("x") == null || request.getParameter("y") == null || request.getParameter("r") == null) {
                sendError(response, ERROR);
                return;
            }
            if (request.getParameter("x").isEmpty() || request.getParameter("y").isEmpty() || request.getParameter("r").isEmpty()) {
                sendError(response, ERROR);
                return;
            }
            if (Double.parseDouble(request.getParameter("x")) < -3 || Double.parseDouble(request.getParameter("x")) > 3) {
                sendError(response, ERROR);
                return;
            }
            if (Double.parseDouble(request.getParameter("y")) < -2 || Double.parseDouble(request.getParameter("y")) > 2) {
                sendError(response, ERROR);
                return;
            }
            if (Double.parseDouble(request.getParameter("r")) < 1 || Double.parseDouble(request.getParameter("y")) > 3) {
                sendError(response, ERROR);
                return;
            }
            Double.parseDouble(request.getParameter("y"));
            Double.parseDouble(request.getParameter("r"));

            response.sendRedirect("/checkArea?" + request.getQueryString());
        } catch (Exception e) {
            sendError(response, e.toString());
        }
    }
    private void sendError(HttpServletResponse response, String error) throws IOException {
        var json = new Gson();
        Map<String, Object> jsonResponse = new HashMap<>() {{
            put("error", error);
        }};

        response.setContentType("application/json");
        response.getWriter().write(json.toJson(jsonResponse));
        response.setStatus(422);
    }
}