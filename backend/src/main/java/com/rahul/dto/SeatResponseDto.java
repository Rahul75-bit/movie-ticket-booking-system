package com.rahul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeatResponseDto {
	
    private Long seatId;
    private String seatNumber;
    private String seatType;
    private Boolean isBooked;

}
