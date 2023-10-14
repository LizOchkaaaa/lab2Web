package model;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.Objects;

public class DataBeans implements Serializable {
    private LinkedList<Beans> dataList;

    public DataBeans() {
        super();
    }

    public LinkedList<Beans> getDataList() {
        return dataList;
    }

    public void setDataList(LinkedList<Beans> dataList) {
        this.dataList = dataList;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        DataBeans beans = (DataBeans) obj;
        if (dataList == null) {
            if (beans.dataList != null)
                return false;
        } else if (!dataList.equals(beans.dataList))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getDataList());
    }

    @Override
    public String toString() {
        return "DataBeans{" +
                "dataList=" + dataList +
                '}';
    }
}
