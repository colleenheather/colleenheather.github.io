import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.TitledBorder;
import net.proteanit.sql.DbUtils;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import java.awt.Font;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JTextField;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.ActionEvent;
import java.sql.*;


//build path: mysql connector & rs2xml

public class VenderDatabase {

	private JFrame frame;
	private JTextField vendorTextField;
	private JTextField contactTextField;
	private JTextField numberTextField;
	private JTextField emailTextField;
	private JTextField shipmentsTextField;
	private JTextField searchTextField;
	private JTable table;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					VenderDatabase window = new VenderDatabase();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public VenderDatabase() {
		initialize();
		Connect();
		table_load();
	}
	
	Connection con;
	PreparedStatement pst;
	ResultSet rs;
	
	public void Connect() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost/vendor_database", "root", "colleen");
		}
		catch (ClassNotFoundException ex) {
			
		}
		catch (SQLException ex) {
			
		}
	}
	
	public void table_load() {
		try {
			pst = con.prepareStatement("select * from vendors");
			rs = pst.executeQuery();
			table.setModel(DbUtils.resultSetToTableModel(rs));
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 819, 479);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		JPanel panel = new JPanel();
		panel.setBorder(new TitledBorder(null, "Registration", TitledBorder.LEADING, TitledBorder.TOP, null, null));
		panel.setBounds(24, 58, 350, 233);
		frame.getContentPane().add(panel);
		panel.setLayout(null);
		
		JLabel vendorLabel = new JLabel("Vendor");
		vendorLabel.setFont(new Font("Tahoma", Font.BOLD, 13));
		vendorLabel.setBounds(25, 39, 80, 20);
		panel.add(vendorLabel);
		
		JLabel contactLabel = new JLabel("Contact");
		contactLabel.setFont(new Font("Tahoma", Font.BOLD, 13));
		contactLabel.setBounds(25, 73, 80, 14);
		panel.add(contactLabel);
		
		vendorTextField = new JTextField();
		vendorTextField.setBounds(114, 39, 196, 20);
		panel.add(vendorTextField);
		vendorTextField.setColumns(10);
		
		contactTextField = new JTextField();
		contactTextField.setBounds(115, 70, 195, 20);
		panel.add(contactTextField);
		contactTextField.setColumns(10);
		
		JLabel numberLabel = new JLabel("Number");
		numberLabel.setFont(new Font("Tahoma", Font.BOLD, 13));
		numberLabel.setBounds(25, 109, 80, 14);
		panel.add(numberLabel);
		
		JLabel emailLabel = new JLabel("Email");
		emailLabel.setFont(new Font("Tahoma", Font.BOLD, 13));
		emailLabel.setBounds(25, 149, 49, 14);
		panel.add(emailLabel);
		
		JLabel shipmentsLabel = new JLabel("Shipments");
		shipmentsLabel.setFont(new Font("Tahoma", Font.BOLD, 13));
		shipmentsLabel.setBounds(25, 185, 80, 14);
		panel.add(shipmentsLabel);
		
		numberTextField = new JTextField();
		numberTextField.setColumns(10);
		numberTextField.setBounds(114, 107, 196, 20);
		panel.add(numberTextField);
		
		emailTextField = new JTextField();
		emailTextField.setColumns(10);
		emailTextField.setBounds(114, 147, 196, 20);
		panel.add(emailTextField);
		
		shipmentsTextField = new JTextField();
		shipmentsTextField.setColumns(10);
		shipmentsTextField.setBounds(114, 183, 196, 20);
		panel.add(shipmentsTextField);
		
		JPanel panel_1 = new JPanel();
		panel_1.setBorder(new TitledBorder(null, "Search", TitledBorder.LEADING, TitledBorder.TOP, null, null));
		panel_1.setBounds(24, 356, 350, 75);
		frame.getContentPane().add(panel_1);
		panel_1.setLayout(null);
		
		JLabel lblNewLabel_2 = new JLabel("Vendor ID");
		lblNewLabel_2.setFont(new Font("Tahoma", Font.BOLD, 13));
		lblNewLabel_2.setBounds(21, 30, 75, 14);
		panel_1.add(lblNewLabel_2);
		
		searchTextField = new JTextField();
		searchTextField.addKeyListener(new KeyAdapter() {
			@Override
			public void keyReleased(KeyEvent e) {
				try {
					String id = searchTextField.getText();
					
					pst = con.prepareStatement("select vendor,contact,number,email,shipments from vendors where id=?");
					pst.setString(1, id);
					ResultSet rs = pst.executeQuery();
					
					if(rs.next() == true) {
						String vendor = rs.getString(1);
						String contact = rs.getString(2);
						String number = rs.getString(3);
						String email = rs.getString(4);
						String shipments = rs.getString(5);
						
						vendorTextField.setText(vendor);
						contactTextField.setText(contact);
						numberTextField.setText(number);
						emailTextField.setText(email);
						shipmentsTextField.setText(shipments);
					}
					else {
						vendorTextField.setText("");
						contactTextField.setText("");
						numberTextField.setText("");
						emailTextField.setText("");;
						shipmentsTextField.setText("");
					}
					
				} catch(SQLException ex) {
					
				}
			}
		});
		
		
		searchTextField.setColumns(10);
		searchTextField.setBounds(118, 28, 196, 20);
		panel_1.add(searchTextField);
		
		JScrollPane scrollPane = new JScrollPane();
		scrollPane.setBounds(384, 58, 397, 305);
		frame.getContentPane().add(scrollPane);
		
		table = new JTable();
		scrollPane.setViewportView(table);
		
		JButton saveButton = new JButton("Save");
		saveButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String vname, vcontact, vnumber, vemail, vshipments;
				
				vname = vendorTextField.getText();
				vcontact = contactTextField.getText();
				vnumber = numberTextField.getText();
				vemail = emailTextField.getText();
				vshipments = shipmentsTextField.getText();
				
				try {
					pst = con.prepareStatement("insert into vendors(vendor, contact, number, email, shipments)values(?,?,?,?,?)");
					pst.setString(1, vname);
					pst.setString(2, vcontact);
					pst.setString(3, vnumber);
					pst.setString(4, vemail);
					pst.setString(5, vshipments);
					pst.executeUpdate();
					JOptionPane.showMessageDialog(null, "Record Added");
					table_load();
					vendorTextField.setText("");
					contactTextField.setText("");
					numberTextField.setText("");
					emailTextField.setText("");
					shipmentsTextField.setText("");
					vendorTextField.requestFocus();
				}
				
				catch (SQLException e1) {
					e1.printStackTrace();
				}
				
			}
		});
		saveButton.setBounds(34, 302, 89, 43);
		frame.getContentPane().add(saveButton);
		
		JButton exitButton = new JButton("Exit");
		exitButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				System.exit(0);
			}
		});
		exitButton.setBounds(144, 302, 89, 43);
		frame.getContentPane().add(exitButton);
		
		JButton clearButton = new JButton("Clear");
		clearButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				vendorTextField.setText("");
				contactTextField.setText("");
				numberTextField.setText("");
				emailTextField.setText("");
				shipmentsTextField.setText("");
				
				vendorTextField.requestFocus();
			}
		});
		clearButton.setBounds(251, 302, 89, 43);
		frame.getContentPane().add(clearButton);
		
		JButton updateButton = new JButton("Update");
		updateButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String vname, vcontact, vnumber, vemail, vshipments;
				
				vname = vendorTextField.getText();
				vcontact = contactTextField.getText();
				vnumber = numberTextField.getText();
				vemail = emailTextField.getText();
				vshipments = shipmentsTextField.getText();
				
				try {
					pst = con.prepareStatement("update vendors set vendor=?,contact=?,number=?,email=?,shipments=?");
					pst.setString(1, vname);
					pst.setString(2, vcontact);
					pst.setString(3, vnumber);
					pst.setString(4, vemail);
					pst.setString(5, vshipments);
					pst.executeUpdate();
					JOptionPane.showMessageDialog(null, "Record Updated");
					table_load();
					vendorTextField.setText("");
					contactTextField.setText("");
					numberTextField.setText("");
					emailTextField.setText("");
					shipmentsTextField.setText("");
					vendorTextField.requestFocus();
				}
				
				catch (SQLException e1) {
					e1.printStackTrace();
				}
				
			}
		});
		updateButton.setBounds(394, 374, 89, 43);
		frame.getContentPane().add(updateButton);
		
		JButton deleteButton = new JButton("Delete");
		deleteButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String vid;
				
				vid = searchTextField.getText();
				
				try {
					pst = con.prepareStatement("delete from vendors where id=?");
					pst.setString(1,vid);
					pst.executeUpdate();
					JOptionPane.showMessageDialog(null, "Record deleted");
					vendorTextField.setText("");
					contactTextField.setText("");
					numberTextField.setText("");
					emailTextField.setText("");
					shipmentsTextField.setText("");
				} 
				catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		deleteButton.setBounds(514, 374, 89, 43);
		frame.getContentPane().add(deleteButton);
		
		JLabel lblNewLabel_1 = new JLabel("Vendor Database Manager");
		lblNewLabel_1.setFont(new Font("Tahoma", Font.BOLD, 18));
		lblNewLabel_1.setBounds(270, 4, 269, 43);
		frame.getContentPane().add(lblNewLabel_1);
	}
}
