package com.rahul.response_wrapper;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class ResponseWrapper {
	
	private String message;
	private Object data;
	private int status;
}
