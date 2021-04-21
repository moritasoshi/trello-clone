CREATE TABLE `user`
(
    user_id  int(11)             NOT NULL AUTO_INCREMENT,
    email    varchar(255) UNIQUE NOT NULL,
    password varchar(255)        NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE `board`
(
    board_id   int(11)      NOT NULL AUTO_INCREMENT,
    board_name varchar(255) NOT NULL,
    user_id    int(11)      NOT NULL,
    PRIMARY KEY (board_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE `tile`
(
    tile_id    int(11)      NOT NULL AUTO_INCREMENT,
    tile_name  varchar(255) NOT NULL,
    tile_order int(11)      NOT NULL,
    board_id   int(11)      NOT NULL,
    PRIMARY KEY (tile_id),
    FOREIGN KEY (board_id) REFERENCES board (board_id)
);

CREATE TABLE `card`
(
    card_id    int(11)      NOT NULL AUTO_INCREMENT,
    card_name  varchar(255) NOT NULL,
    card_order int(11)      NOT NULL,
    tile_id    int(11)      NOT NULL,
    PRIMARY KEY (card_id),
    FOREIGN KEY (tile_id) REFERENCES tile (tile_id)
);