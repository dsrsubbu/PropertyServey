package com.ps.hibernate.models;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.ps.hibernate.common.BaseEntity;

@Entity
public class Role extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    @Column(nullable = false)
    private String name;

    private String description;
    private String accessLevel;
    
    public Role()
    {

    }

    public Role(Long id)
    {
        this.id = id;
    }

    public Role(String id)
    {
        this.id = Long.parseLong(id);
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

	public String getAccessLevel() {
		return accessLevel;
	}

	public void setAccessLevel(String accessLevel) {
		this.accessLevel = accessLevel;
	}
}
