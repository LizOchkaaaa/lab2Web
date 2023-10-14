package servlet;
import com.google.gson.Gson;
import model.Beans;
import model.DataBeans;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import static java.lang.Math.*;

public class AreaCheckServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        send(request , response);
    }
    public void send(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            final long startExec = System.nanoTime();
            final String x = request.getParameter("x");
            final String y = request.getParameter("y");
            final String r = request.getParameter("r");

            final double dx;
            final double dy;
            final double dr;

            try {
                dx = Double.parseDouble(x);
                dy = Double.parseDouble(y);
                dr = Double.parseDouble(r);
            } catch (NumberFormatException | NullPointerException e) {
                response.sendError(400);
                return;
            }

            final boolean result = checkArea(dx, dy, dr);

            final HttpSession currentSession = request.getSession();
            DataBeans datas = (DataBeans) currentSession.getAttribute("points");
            if (datas == null) {
                datas = new DataBeans();
                currentSession.setAttribute("points", datas);
            }
            if (datas.getDataList() == null)
                datas.setDataList(new LinkedList<>());

            final long endExec = System.nanoTime();
            final long scriptTime = endExec - startExec;
            final LocalDateTime time = LocalDateTime.now();

            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:MM:SS");
            String formattedDateTime = time.format(dtf);

            Beans beans = new Beans(dx, dy, dr, result, scriptTime, time);
            datas.getDataList().addFirst(beans);
            currentSession.setAttribute("points", datas);
            var gson = new Gson();
            Map<String, Object> json = new HashMap<>();
            json.put("x", x);
            json.put("y", y);
            json.put("r", r);
            json.put("result", result);
            json.put("scriptTime", scriptTime);
            json.put("time", formattedDateTime);
            var msg = gson.toJson(json);
            response.setContentType("application/json");
            response.getWriter().write(msg);

        }catch (Exception e){
                request.getRequestDispatcher("./index.jsp").forward(request, response);
            }
        }
    private boolean checkArea(double x, double y, double r) {
        if (x >= 0 && y >= 0) {
            double x1 = 0;
            double y1 = 0;
            double x2 = r/2;
            double y2 = 0;
            double x3 = 0;
            double y3 = r;

            return (((x - x1) * (y2 - y1) - (x2 - x1) * (y - y1)) * ((x - x2) *
                    (y3 - y2) - (x3 - x2) * (y - y2)) * ((x - x3) * (y1 - y3) - (x1 - x3) * (y - y3))) <= 0;
        }

        if (x < 0 && y >= 0) {
            return false;
        }

        if (x >= 0 && y < 0) {
            return (pow(x, 2) + pow(y, 2)) <= pow(r/2, 2);
        }

        return (abs(x) <= r && abs(y) <= r);
    }
}