package servlet;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ErrorSend {
    public void sendError(HttpServletResponse response , HttpServletRequest request , String code , String message) throws IOException {
        var gson = new Gson();
        Map<String, Object> json = new HashMap<>();
        json.put("code", code);
        json.put("message", message);
        var msg = gson.toJson(json);
        response.setContentType("application/json");
        response.getWriter().write(msg);
    }
}
