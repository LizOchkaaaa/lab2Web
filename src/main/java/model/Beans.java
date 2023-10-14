package model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class Beans implements Serializable {
    private double x;
    private  double y;
    private double r;
    private boolean result;
    private long scriptTime;
    private LocalDateTime time;
    public Beans(double x, double y, double r, boolean result, long scriptTime , LocalDateTime time) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.scriptTime = scriptTime;
        this.time = time;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getResult() {
        return result;
    }

    public long getScriptTime() {
        return scriptTime;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public void setScriptTime(long scriptTime) {
        this.scriptTime = scriptTime;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Beans beans = (Beans) o;
        return result == beans.result &&
                x == beans.x &&
                y == beans.y &&
                r == beans.r;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getX(), getY(), getR(), getResult(), getScriptTime(), getTime());
    }

    @Override
    public String toString() {
        return "AreaData{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                ", scriptTime=" + scriptTime +
                ", time=" + time +
                '}';
    }
}
