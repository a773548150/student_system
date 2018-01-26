<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 15:22
 */

// 修改时区，使得ddate("Y-m-d H:i:s")能被使用
date_default_timezone_set('PRC');
header("Content-type:text/html;charset=utf-8");

class DB {
    private $mysqli;
    private $currentTime;

    function __construct() {
        $this->_connection();
    }

    private function _connection() {
        $this->mysqli = new mysqli("localhost", "root", "root", "db_student_system", "3306");
        $this->currentTime = date("Y-m-d H:i:s");
        if ($this->mysqli->errno) {
            printf("Unable to connect to the database:<br /> %s", $this->mysqli->error);
            printf("The error number is %s<br/>", $this->mysqli->errno);
            exit();
        }
    }

    //当请求正确时，res被赋值为0
    public function db_query($sql) {
        $res = mysqli_query($this->mysqli, $sql);
        if (!$res) {
           printf("SQL statement execution failure.<br />");
           printf("Error coding is %s. <br />", mysqli_errno($this->mysqli));
           printf("Error message is %s.<br />", mysqli_error($this->mysqli));
        }
        return $res;
    }

    public function login_manager($username, $password) {
        $query = "select * from t_manager where username = '{$username}' and password = '{$password}'";
        $res = $this->db_query($query);
        if (mysqli_num_rows($res) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function update_manager_password($username, $oldPassword, $newPassword) {
        $query1 = "select * from t_manager where username = '{$username}' and password = '{$oldPassword}'";
        $res = $this->db_query($query1);
        if (mysqli_num_rows($res) > 0) {
            $query2 = "update t_manager set password = '{$newPassword}', update_time = '{$this->currentTime}' where username = '{$username}'";
            $this->db_query($query2);
            // 修改密码成功返回2，失败返回1
            if (mysqli_affected_rows($this->mysqli) > 0) {
                return 2;
            } else {
                return 1;
            }
        } else {
            // 登录失败返回0
            return 0;
        }
    }

    public function insert_student_message($message) {
        $query = "insert into t_student(number, name, sex, age, major, create_time) values('{$message['number']}', '{$message['name']}', '{$message['sex']}', '{$message['age']}', '{$message['major']}', '{$this->currentTime}')";
        $this->db_query($query);
        return mysqli_affected_rows($this->mysqli);
    }

    public function update_student_message($message, $name) {

        foreach($message as $key => $item) {
            $query = "update t_student set $key='{$item}', update_time='{$this->currentTime}' where name = '{$name}'";
            $this->db_query($query);
        }

        return mysqli_affected_rows($this->mysqli);
    }

    public function delete_student_message($name) {
        $query = "update t_student set delete_time='{$this->currentTime}', status='1' where name='{$name}'";
        $this->db_query($query);

        return mysqli_affected_rows($this->mysqli);
    }

    public function select_student($message) {
        $content = array();
        $query = "select name, sex, age, major, status from t_student where name like '%{$message}%' or number like '%{$message}%'";
        $res = $this->db_query($query);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
//            $name = $row['name'];
//            $sex = $row['sex'];
//            $age = substr($this->currentTime, 0, 10) - $row['age'];
//            $major = $row['major'];
//            if ($row['status'] != FALSE) {
//                printf("name = %s, sex = %s, age = %s, major = %s.<br />", $name, $sex, $age, $major);
//            }
            $content[] = $row;
        }

        return $content;
    }

    public function insert_course_message($message) {
        $query = "insert into t_course(number, name, credit, start_time, create_time) values('{$message['number']}', '{$message['name']}', '{$message['credit']}', '{$message['start_time']}', '{$this->currentTime}')";
        $this->db_query($query);
        return mysqli_affected_rows($this->mysqli);
    }

    public function update_course_message($message) {
        foreach ($message as $key => $item) {
            $query = "update t_course set $key='{$item}', update_time='{$this->currentTime}' where number = '{$message['number']}'";
            $this->db_query($query);
        }

        return mysqli_affected_rows($this->mysqli);
    }

    public function delete_course_message($name) {
        $query = "update t_course set delete_time='{$this->currentTime}', status='1' where name='{$name}'";
        $this->db_query($query);

        return mysqli_affected_rows($this->mysqli);
    }

    public function select_course($message) {
        $content = array();
        $query = "select number, name, credit, start_time, status from t_course where name like '%{$message}%' or number like '%{$message}%'";
        $res = $this->db_query($query);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $content[] = $row;
        }

        return $content;
    }

    public function insert_score($message) {
        $query1 = "select id from t_student where number = '{$message['studentNumber']}'";
        $res1 = $this->db_query($query1);
        $row1 = $res1->fetch_object();
        $studentId = $row1->id;

        $query2 = "select id from t_course where number = '{$message['courseNumber']}'";
        $res2 = $this->db_query($query2);
        $row2 = $res2->fetch_object();
        $courseId = $row2->id;

        $query3 = "insert into t_score(student_id, course_id, score, create_time) values('{$studentId}', '{$courseId}', '{$message['score']}', '{$this->currentTime}')";
        $this->db_query($query3);

        return mysqli_affected_rows($this->mysqli);
    }

    public function select_score($message) {
        $content = array();
        $queryDropTmp = "drop table if exists tmp_table;";
        $this->db_query($queryDropTmp);
        // 创建临时表tmp_table，将t_student,t_course,t_score连接起来存入临时表中
        $queryTmp = "create temporary table tmp_table 
                         select t_student.number, t_student.name as student_name, t_course.name as course_name,  score from t_student 
                         left outer join t_score on t_student.id=t_score.student_id  
                         left outer join t_course on t_course.id=t_score.course_id 
                         where t_student.status > 0 and t_course.status > 0;";
        $this->db_query($queryTmp);
        $query = "select * from tmp_table;";
        $res = $this->db_query($query);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
//            $number = $row['number'];
//            $studentName = $row['student_name'];
//            $courseName = $row['course_name'];
//            $score = $row['score'];
//            printf("number = %s, studentName = %s, courseName = %s, score = %s.<br />", $number, $studentName, $courseName, $score);
            $content[] = $row;
        }
        return $content;
    }
}