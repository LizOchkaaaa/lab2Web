<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ page import="java.text.DecimalFormat" %>

<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link rel="stylesheet" href="file.css">
	<title>Лабораторная работа по Веб-программированию</title>
	<style>
	</style>
</head>
<body>
	<header>
		<div class="logo">
			<img id = "logo" src="itmo.png" width="100" height="85"/>
		</div>
		<div class="left-right-line-short-header">Суворова Елизавета Михайловна</div>
		<div class="left-right-line-short-header1">P3223</div>
		<div class="left-right-line-short-header2">Вариант 285213</div>
	</header>
	<div class="frame2">
      <svg width="500" height="300" class="svg-graph" id="svg">

        <line class="axis" x1="0" x2="300" y1="150" y2="150" stroke="black"></line>
        <line class="axis" x1="150" x2="150" y1="0" y2="300" stroke="black"></line>

        <polygon points="150,0 144,15 156,15" stroke="black"></polygon>
        <polygon points="300,150 285,156 285,144" stroke="black"></polygon>

        <line class="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="black"></line>
        <line class="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="black"></line>

        <line class="coor-line" x1="50"  x2="50"  y1="155" y2="145" stroke="black"></line>
        <line class="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="black"></line>

        <line class="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="black"></line>
        <line class="coor-line" x1="145" x2="155" y1="50"  y2="50"  stroke="black"></line>

        <line class="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="black"></line>
        <line class="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="black"></line>

        <text class="coor-text" x="195" y="140">R/2</text>
        <text class="coor-text" x="248" y="140">R</text>

        <text class="coor-text" x="40" y="140">-R</text>
        <text class="coor-text" x="90" y="140">-R/2</text>

        <text class="coor-text" x="160" y="105">R/2</text>
        <text class="coor-text" x="160" y="55">R</text>

        <text class="coor-text" x="160" y="205">-R/2</text>
        <text class="coor-text" x="160" y="255">-R</text>

        <text class="axis-text" x="290" y="170">x</text>
        <text class="axis-text" x="160" y="13">y</text>

        <!-- first figure-->
        <rect x="50" y="150" width="100" height="100" style="fill:#cdc684; stroke:#cdc684; fill-opacity:0.3;" />

        <!-- second figure-->
        <polygon points="150,150 150,50 200,150" style="fill:#cdc684; stroke:#cdc684; fill-opacity:0.3;"></polygon>

        <!-- third figure-->
        <path d="M 200 150 A 50 50, 180, 0, 1, 150 200 L 150 150 Z" style="fill:#cdc684; stroke:#cdc684; fill-opacity:0.3;"></path>
        <circle r="0" cx="150" cy="150" id="target-dot"></circle>
      </svg>
    </div>
<!--  <form id="form" action="controller" class="form" method="GET">-->
	  <div class="container2">
      <p class="p1">Выберите X: </p>
        <input class="text" id="text" name="x" type="float"  placeholder="(-3...3)"/>
        <p class="p2">Выберите Y: </p>
        <select class="selectY" name="selectY" id="Y">
          <option selected="Y" disabled="Y">Y</option>
          <option name="selectY" value="-2" >-2</option>
          <option name="selectY" value="-1.5" >-1.5</option>
          <option name="selectY" value="-1" >-1</option>
          <option name="selectY" value="-0.5" >-0.5</option>
          <option name="selectY" value="0" >0</option>
          <option name="selectY" value="0.5" >0.5</option>
          <option name="selectY" value="1" >1</option>
          <option name="selectY" value="1.5">1.5</option>
          <option name="selectY" value="2">2</option>
       </select>
        <p class="p3">Выберите R: </p>
        <select class="selectR" name="selectR" id="R">
            <option selected="R" disabled="R">R</option>
            <option name="selectR" value="1" >1</option>
            <option name="selectR" value="1.5" >1.5</option>
            <option name="selectR" value="2" >2</option>
            <option name="selectR" value="2.5" >2.5</option>
            <option name="selectR" value="3">3</option>
         </select>
        <input class="submit" type="submit" name="submit" id="btn1" value="Check"/>
	    </div>
<!--    </form>-->
    <div class="container3">
      <table class="resultTable">
          <thead>
            <tr>
              <th>x</th>
              <th>y</th>
              <th>r</th>
              <th>Итог</th>
              <th>Время скрипта</th>
              <th>Текущее время</th>
            </tr>
          </thead>
          <tbody id="output" class="table-body">

                <c:forEach var="dataBeans" items = "${points.dataList}">
                    <tr>
                        <fmt:setLocale value="en_US"/>
                        <td><fmt:formatNumber value="${dataBeans.x}"  type="number" maxFractionDigits="3" minFractionDigits="0"/></td>
                        <td><fmt:formatNumber value="${dataBeans.y}" type="number" maxFractionDigits="3" minFractionDigits="0"/></td>
                        <td>${dataBeans.r}</td>
                        <td>${dataBeans.result ? "Hit " : "Miss "}</td>
                        <td>${dataBeans.scriptTime}</td>
                        <td>${dataBeans.time.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"))}</td>
                    </tr>
                </c:forEach>
          </tbody>
        </table>
  </div>
	</div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="script.js"></script>
    <script src="drawPoint.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js" integrity="sha256-lSjKY0/srUM9BE3dPm+c4fBo1dky2v27Gdjm2uoZaL0=" crossorigin="anonymous"></script>
</body>
</html>
