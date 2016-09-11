package com.ps.hibernate.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.ps.hibernate.common.BaseEntity;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserInfo extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    public UserInfo()
    {
    }

    public UserInfo(Long id)
    {
        this.id = id;
    }

    public UserInfo(String id)
    {
        this.id = Long.parseLong(id);
    }

    @Column(unique = true)
    private String userName;
    private Timestamp createdDate;

    private String name;
    private String password;

    @OneToOne
    @JoinColumn(name = "ROLE_ID", columnDefinition = "bigint")
    private Role role;

    private String mobileNo;

    private String emailId;
    private String status;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
