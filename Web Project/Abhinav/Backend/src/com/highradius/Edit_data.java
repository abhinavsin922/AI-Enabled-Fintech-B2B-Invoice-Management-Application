package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class Edit_data
 */
@WebServlet("/Edit_data")
public class Edit_data extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String user = "root";
    private static final String password = "abhinav@3622";
	static final String jdbc="com.mysql.cj.jdbc.Driver";
    static final String dburl = "jdbc:mysql://localhost:3306/highradius";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Edit_data() {
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
		String ttlamt = request.getParameter("total_open_amount");
        String notes = request.getParameter("notes");
        String invid= request.getParameter("invoice_id");
        int executionstatus = 0;
        
        Connection connect = null;
        PreparedStatement state = null;

        List<Add_jo> response_list = new ArrayList<Add_jo>();
        Add_jo demo = new Add_jo();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connect = DriverManager.getConnection(dburl,user,password);
            state = connect.prepareStatement("Update customer_details set total_open_amount=?,notes=? where invoice_id=?");

            state.setString(1,ttlamt);
            state.setString(2,notes);
            state.setString(3,invid);
            executionstatus = state.executeUpdate();
            if(executionstatus >= 1) {
            	demo.setExecutionStatus("true");
            	demo.setExecutionMessage("Data Is Editted");
            }
            else {
            	demo.setExecutionStatus("false");
            	demo.setExecutionMessage("Data Can't Be Editted");
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
            connect.close();
            state.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }


    private String json_from_res (List<Add_jo> exec_resp)
    {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(exec_resp);
        return json;

    }
}