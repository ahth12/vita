create table check_lists
(id bigint not null,
check_list_status integer,
comment varchar(255),
name varchar(255),
 check_id bigint,
 primary key (id));
create table checks (id bigint not null, check_status integer, check_target varchar(255), checker_name varchar(255), primary key (id));
alter table check_lists add constraint FK_check_lists foreign key (check_id) references checks;


