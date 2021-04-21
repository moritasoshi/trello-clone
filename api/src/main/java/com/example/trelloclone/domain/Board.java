package com.example.trelloclone.domain;

import lombok.Data;
import org.seasar.doma.*;

import java.util.List;

@Data
@Entity
@Table(name = "tile")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long board_id;
    private String board_name;
    private String user_uid;
}
