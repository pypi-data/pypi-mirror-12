============
Examples
============

-----------
model define
-----------
    dbargkws = {'user': 'test',
                'password': 'test',
                'host': 'localhost',
                'port': "3306",
                'database': 'test',
                'autocommit': False,
                'charset': 'utf8'
                }


    from miniorm import Model
    
    user_model = Model.make("User", dbargkws, "users")  #users is db tablename


-----------
select
-----------
    s = user_model.get_by_map({"id": u.id}, select_cols=["id", 'name'])

-----------
select like
-----------
    s = user_model.get_by_map({"id": u.id, "name$like":"john"}, select_cols=["id", 'name'])

-----------
select search
-----------
    search all name with john* and nathen*
    s = user_model.get_by_map({"id": u.id, "name$match":"john nathen"}, select_cols=["id", 'name'])


-----------
select gt/gte/lt/lte
-----------
    s = user_model.get_by_map({"id$gt": 1, "name$like":"john"}, select_cols=["id", 'name'])

-----------
select order by/pagination/
-----------
    s = user_model.get_by_map({"name$like":"john"}, start=0,limit=20, and_or="and", order_by=["id desc", "name"])

-----------
count distinct
-----------
    usercont = user_model.count_by_map({"id$gt": 1, "name$like":"john"}, distinct="pid")

-----------
insert
-----------
 - by namedtuple
    User = namedtuple("User", ['id', 'name', 'pwd', 'email'])
    user = User(None, '1', '2', "10000003exeee@a.com")
    ins = user_model.insert(user)

 - by dict
    user = {'name':"ww", 'pwd':"pwd", 'email': "xxx"}
    ins = user_model.insert(user)

-----------
update
-----------
 - by namedtuple
    User = namedtuple("User", ['id', 'name', 'pwd', 'email'])
    user = User(1, '1', '2', "10000003exeee@a.com")
    updates, nops = user_model.update(user)
    updates, nops = user_model.update(user, where={"id":1})

 - by dict
    user = {'id':1, 'name':"ww", 'pwd':"pwd", 'email': "xxx"}
    updates, nops = user_model.update(user)
    updates, nops = user_model.update(user, where={"id":1})

-----------
delete
-----------
    uid = 1

    user_model.delete_by_id(uid)

    user_model.delete_by_map({"id":uid})

