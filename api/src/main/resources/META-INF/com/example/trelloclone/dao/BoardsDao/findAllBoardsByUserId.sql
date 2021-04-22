SELECT boa.board_id   as board_id,
       boa.board_name as board_name,
       boa.user_id    as user_id,

       til.tile_id    as tile_id,
       til.tile_name  as tile_name,
       til.tile_order as tile_order,

       car.card_id    as card_id,
       car.card_name  as card_name,
       car.card_order as card_order
FROM board as boa
         LEFT JOIN tile as til
                   on boa.board_id = til.board_id
         LEFT JOIN card as car
                   on til.tile_id = car.tile_id

WHERE boa.user_id = /* user_id */0
ORDER BY boa.board_id, til.tile_order, car.card_order