<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 15:22
 */

// 修改时区，使得date("Y-m-d H:i:s")能被使用
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

    // 当请求正确时，res被赋值为0
    public function db_query($sql) {
        $res = mysqli_query($this->mysqli, $sql);
        if (!$res) {
           printf("SQL statement execution failure.<br />");
           printf("Error coding is %s. <br />", mysqli_errno($this->mysqli));
           printf("Error message is %s.<br />", mysqli_error($this->mysqli));
        }
        return $res;
    }

    // 登录管理员账号，成功返回true，失败返回false
    public function login_manager($username, $password) {
        $query = "select * from t_manager where username = '{$username}' and password = '{$password}'";
        $res = $this->db_query($query);
        if (mysqli_num_rows($res) > 0) {
            return true;
        } else {
            return false;
        }
    }

    // 登录老师账号，成功返回true，失败返回false
    public function login_teacher($username, $password) {
        $query = "select * from t_teacher where username = '{$username}' and password = '{$password}'";
        $res = $this->db_query($query);
        if (mysqli_num_rows($res) > 0) {
            return true;
        } else {
            return false;
        }
    }

    // 判断是否登录管理员，已经登录返回true，未登录返回unlogin
    public function is_login_manager() {
        session_start();
        if (! isset($_SESSION['username'])) {
            echo "unloginManager";
            exit();
        } else {
            return true;
        }
    }

    // 判断是否登录老师，已经登录返回true，未登录返回unlogin
    public function is_login_teacher() {
        session_start();
        if (! isset($_SESSION['teacherName'])) {
            echo "unloginTeacher";
            exit();
        } else {
            return true;
        }
    }

    // 修改管理员密码，修改完自动登录
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

    // 修改老师密码，修改完自动登录
    public function update_teacher_password($username, $oldPassword, $newPassword) {
        $query1 = "select * from t_teacher where username = '{$username}' and password = '{$oldPassword}'";
        $res = $this->db_query($query1);
        if (mysqli_num_rows($res) > 0) {
            $query2 = "update t_teacher set password = '{$newPassword}', update_time = '{$this->currentTime}' where username = '{$username}'";
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

    // 插入学生信息，返回影响的行数
    public function insert_student_message($message) {
        $query = "insert into t_student(number, name, sex, age, major, create_time) values('{$message['number']}', '{$message['name']}', '{$message['sex']}', '{$message['age']}', '{$message['major']}', '{$this->currentTime}')";
        $this->db_query($query);
        return mysqli_affected_rows($this->mysqli);
    }

    // 修改学生信息，返回值有错误，只返回0？？
    public function update_student_message($message, $number) {

        foreach($message as $key => $item) {
            $query = "update t_student set $key='{$item}', update_time='{$this->currentTime}' where number = '{$number}'";
            $this->db_query($query);
        }

        return mysqli_affected_rows($this->mysqli);
    }

    // 删除学生信息，进行假删除，把学生状态status改为0
    public function delete_student_message($number) {
        $query = "update t_student set delete_time='{$this->currentTime}', status='0' where number='{$number}'";
        $this->db_query($query);

        return mysqli_affected_rows($this->mysqli);
    }

    // 查询学生信息，通过模糊搜索姓名或学号，查询出学号，姓名，性别，年龄，专业，状态
    public function select_student($message) {
        $content = array();
        $query = "select number, name, sex, age, major, status from t_student where name like '%{$message}%' or number like '%{$message}%'";
        $res = $this->db_query($query);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $content[] = $row;
        }
        return $content;
    }

    // 插入教师信息，返回影响的行数
    public function insert_teacher_message($message) {
        $query = "insert into t_teacher(number, name, username, password, create_time) values('{$message['number']}', '{$message['name']}', '{$message['username']}', '{$message['password']}',  '{$this->currentTime}')";
        $this->db_query($query);
        return mysqli_affected_rows($this->mysqli);
    }

    // 修改教师信息，返回值有错误，只返回0？？
    public function update_teacher_message($message, $number) {

        foreach($message as $key => $item) {
            $query = "update t_teacher set $key='{$item}', update_time='{$this->currentTime}' where number = '{$number}'";
            $this->db_query($query);
        }
        return mysqli_affected_rows($this->mysqli);
    }

    // 删除教师信息，进行假删除，把教师状态status改为0
    public function delete_teacher_message($number) {
        $query = "update t_teacher set delete_time='{$this->currentTime}', status='0' where number='{$number}'";
        $this->db_query($query);
        return mysqli_affected_rows($this->mysqli);
    }

    // 查询教师信息，通过模糊搜索姓名或学号，查询出编号，姓名，用户名，密码
    public function select_teacher($message) {
        $content = array();
        $query = "select number, name, username, password, status from t_teacher where name like '%{$message}%' or number like '%{$message}%'";
        $res = $this->db_query($query);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $content[] = $row;
        }
        return $content;
    }

    // 插入课程信息
    public function insert_course_message($message) {
        $query = "insert into t_course(number, name, credit, start_time, create_time) values('{$message['number']}', '{$message['name']}', '{$message['credit']}', '{$message['start_time']}', '{$this->currentTime}')";
        $this->db_query($query);
        return mysqli_affected_rows($this->mysqli);
    }

    // 修改课程信息
    public function update_course_message($message) {
        foreach ($message as $key => $item) {
            $query = "update t_course set $key='{$item}', update_time='{$this->currentTime}' where number = '{$message['number']}'";
            $this->db_query($query);
        }

        return mysqli_affected_rows($this->mysqli);
    }

    // 删除课程信息
    public function delete_course_message($number) {
        $query = "update t_course set delete_time='{$this->currentTime}', status='0' where number='{$number}'";
        $this->db_query($query);

        return mysqli_affected_rows($this->mysqli);
    }

    // 查询课程信息，通过课程名与课程号模糊搜索，查询出课程号，课程名，学分，开课时间，状态
    public function select_course($message) {
        $content = array();
        $query = "select number, name, credit, start_time, status from t_course where name like '%{$message}%' or number like '%{$message}%'";
        $res = $this->db_query($query);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $content[] = $row;
        }

        return $content;
    }

    // 插入成绩，通过学号与课程名查询对应的id，再插入成绩表中
    public function insert_score($message) {
        // 先通过学号查询得到学生id
        $query1 = "select id from t_student where number = '{$message['studentNumber']}'";
        $res1 = $this->db_query($query1);
        $row1 = $res1->fetch_object();
        $studentId = $row1->id;
        // 再通过课程号查询得到课程的id
        $query2 = "select id from t_course where number = '{$message['courseNumber']}'";
        $res2 = $this->db_query($query2);
        $row2 = $res2->fetch_object();
        $courseId = $row2->id;
        // 最后通过学生id和课程id还有成绩插入成绩表中
        $query3 = "insert into t_score(student_id, course_id, score, create_time) values('{$studentId}', '{$courseId}', '{$message['score']}', '{$this->currentTime}')";
        $this->db_query($query3);

        return mysqli_affected_rows($this->mysqli);
    }

    // 查询成绩，先建立临时表，再查询出学号，姓名，课程名，成绩
    public function select_score($message) {
        $content = array();
        $queryDropTmp = "drop table if exists tmp_table;";
        $this->db_query($queryDropTmp);
        // 创建临时表tmp_table，将t_student,t_course,t_score连接起来存入临时表中
        $queryTmp = "create temporary table tmp_table 
                         select t_student.number, t_student.name as student_name, t_course.name as course_name,  score from t_student 
                         left outer join t_score on t_student.id=t_score.student_id  
                         left outer join t_course on t_course.id=t_score.course_id 
                         where t_student.number like '%{$message}%' and t_student.status > 0 and t_course.status > 0
                         order by t_student.number;";
        $this->db_query($queryTmp);
        $query = "select * from tmp_table;";
        $res = $this->db_query($query);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $content[] = $row;
        }
        return $content;
    }

    // 导入excel表
    public function upExecel(){
        //判断是否选择了要上传的表格
        if (empty($_POST['myfile'])) {
            echo "<script>alert(您未选择表格);history.go(-1);</script>";
        }
        //获取表格的大小，限制上传表格的大小5M
        $file_size = $_FILES['myfile']['size'];
        if ($file_size>5*1024*1024) {
            echo "<script>alert('上传失败，上传的表格不能超过5M的大小');history.go(-1);</script>";
            exit();
        }
        //限制上传表格类型
        $file_type = $_FILES['myfile']['type'];
        //application/vnd.ms-excel  为xls文件类型
        if ($file_type!='application/vnd.ms-excel') {
            //echo "<script>alert('上传失败，只能上传excel2003的xls格式!');history.go(-1)</script>";
            //exit();
        }
        //判断表格是否上传成功
        if (is_uploaded_file($_FILES['myfile']['tmp_name'])) {
            require_once 'PHPExcel.php';
            require_once 'PHPExcel/IOFactory.php';
            require_once 'PHPExcel/Reader/Excel5.php';
            //以上三步加载phpExcel的类
            $objReader = PHPExcel_IOFactory::createReader('Excel5');//use excel2007 for 2007 format
            //接收存在缓存中的excel表格
            $filename = $_FILES['myfile']['tmp_name'];
            $objPHPExcel = $objReader->load($filename); //$filename可以是上传的表格，或者是指定的表格
            $sheet = $objPHPExcel->getSheet(0);
            $highestRow = $sheet->getHighestRow(); // 取得总行数
            // $highestColumn = $sheet->getHighestColumn(); // 取得总列数
            //循环读取excel表格,读取一条,插入一条
            //j表示从哪一行开始读取  从第二行开始读取，因为第一行是标题不保存
            //$a表示列号
            for($j=2;$j<=$highestRow;$j++)
            {
                $number = $objPHPExcel->getActiveSheet()->getCell("A".$j)->getValue();//获取A(业主名字)列的值
                $name = $objPHPExcel->getActiveSheet()->getCell("B".$j)->getValue();//获取B(密码)列的值
                $sex = $objPHPExcel->getActiveSheet()->getCell("C".$j)->getValue();//获取C(手机号)列的值
                $age = $objPHPExcel->getActiveSheet()->getCell("D".$j)->getValue();//获取D(地址)列的值
                $major = $objPHPExcel->getActiveSheet()->getCell("E".$j)->getValue();//获取D(地址)列的值
                $currentTime = date("Y-m-d H:i:s");
                //null 为主键id，自增可用null表示自动添加
                $sql = "insert into t_student(number, name, sex, age, major, create_time) values('{$number}', '{$name}', '{$sex}', '{$age}', '{$major}', '{$currentTime}')";
                $res = mysqli_query($this->mysqli, $sql);
                if ($res) {
                    echo "<script>alert('添加成功！');history.go(-1);</script>";
                }else{
                    echo "<script>alert('添加失败！');history.go(-1);</script>";
                    exit();
                }
            }
        }
    }

}