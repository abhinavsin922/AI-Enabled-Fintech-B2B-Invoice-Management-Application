package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mysql.cj.protocol.Resultset;

/**
 * Servlet implementation class Add_data
 */
@WebServlet("/Add_data")
public class Add_data extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String user = "root";
    private static final String password = "abhinav@3622";
	static final String jdbc="com.mysql.cj.jdbc.Driver";
    static final String dburl = "jdbc:mysql://localhost:3306/highradius";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add_data() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int executionStatus=0;
		String name = request.getParameter("name_customer");
		String custnum = request.getParameter("cust_number");
		String invid = request.getParameter("invoice_id");
		String ttlamt = request.getParameter("total_open_amount");
		String duedte = request.getParameter("due_in_date");
		String note = request.getParameter("notes");
		Connection connection  = null;
        PreparedStatement state = null;
        List<Add_jo> response_list = new ArrayList<Add_jo>();
        Add_jo demo=new Add_jo();
        try {
        	Class.forName(jdbc);
            connection = DriverManager.getConnection(dburl,user,password);
            state = connection.prepareStatement("insert into customer_details(name_customer,cust_number,invoice_id,total_open_amount,due_in_date,notes) values(?,?,?,?,?,?)");
            state.setString(1,name);
            state.setString(2,custnum);
            state.setString(3,invid);
            state.setString(4,ttlamt);
            state.setString(5,duedte);
            state.setString(6,note);
            executionStatus=state.executeUpdate();
            if(executionStatus>=1)
            {
            	demo.setExecutionStatus("true");
            	demo.setExecutionMessage("Data Added Successfully");
            }
            else
            {
            	demo.setExecutionStatus("false");
            	demo.setExecutionMessage("Data Not Added Successfully");
            }
            response_list.add(demo);
            String json_string=json_from_res(response_list);
            
            response.setContentType("application/json");
            try
            {
            	response.getWriter().write(json_string);
            }
            catch(IOException e)
            {
            	e.printStackTrace();
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        }
	private String json_from_res(List<Add_jo> resp)
    {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(resp);
        return json;
    }
	}