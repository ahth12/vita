insert into checks(id, check_status, check_target, checker_name)
values (1, 1, 'Астраханская ул., 83, Саратов, Саратовская обл.', 'СГУ им. Чернышевского');
insert into checks(id, check_status, check_target, checker_name)
values (2, 1, 'ул. Академика Павлова, 1, Самара, Самарская обл.', 'СамГУ');
insert into checks(id, check_status, check_target, checker_name)
values (3, 1, 'ул. Стара-Загора, 76, Самара, Самарская обл.', 'СФ МГПУ');

insert into CHECK_LISTS (id, check_list_status, comment, name, check_id)
values (1, 1, 'В подвале', 'Проверить трубы', 1);
insert into CHECK_LISTS (id, check_list_status, comment, name, check_id)
values (2, 1, 'Какой-нибудь комментарий', 'Проверить отчетность', 1);
insert into CHECK_LISTS (id, check_list_status, comment, name, check_id)
values (3, 1, 'Какой-нибудь комментарий', 'Проверить неотчетность', 1);
insert into CHECK_LISTS (id, check_list_status, comment, name, check_id)
values (4, 1, 'В подвале 2 ', 'Проверить трубы 2 ', 2);
insert into CHECK_LISTS (id, check_list_status, comment, name, check_id)
values (5, 1, 'Какой-нибудь комментарий 2', 'Проверить отчетность 2 ', 2);
insert into CHECK_LISTS (id, check_list_status, comment, name, check_id)
values (6, 1, 'Какой-нибудь комментарий 2', 'Проверить неотчетность 2 ', 2);
values (7, 1, 'В подвале 3 ', 'Проверить трубы 3 ', 3);
insert into CHECK_LISTS (id, check_list_status, comment, name, check_id)
values (8, 1, 'Какой-нибудь комментарий 3', 'Проверить отчетность 3 ', 3);