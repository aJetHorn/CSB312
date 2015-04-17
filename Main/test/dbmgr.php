
<?php

class Dbmgr {

    private $_mysqli;

    public function __construct() {
        echo 'The class "', __CLASS__, '" was initiated!<br />';
    }

    public function __destruct() {
        echo 'The class "', __CLASS__, '" was destroyed.<br />';
    }

    public function getDBConnection() {
        if (!isset($_mysqli)) {
            $_mysqli = new mysqli("localhost", "", "", "sei", 3306);
            if ($_mysqli->errno) {
                echo "Unable to connect: %s" + $_mysqli->error;
                exit();
            }
        }
        return $_mysqli;
    }

    public function getAllNodes() {
        $lst = array();
        $con = $this->getDBConnection();
        $queryString = "SELECT node_id, node_name, strategy_id, asset_id, target_pct,parent_node_id FROM node WHERE strategy_id='1';";
        $result = $con->query($queryString);
        $con->close();
        $i = 0;

        while ($row = $result->fetch_row()) {

            $rec = new Item($row[0], $row[1], $row[2], $row[3]);
            $lst[$i++] = $rec;
        }


        return $lst;
    }

    public function storeStrategy() {

        $con = $this->getDBConnection();
        $array = $_POST['tree'];
        echo var_dump($array);
        $name = $_POST['name'];
        echo 'THE STRATEGY NAME IS ';
        echo $name;
        echo "\r\n";
        // query for creating strategy
        // node_id, asset_type, strategy_id, asset_id, target_pct
        // for each object
        //INSERT INTO `strategy`(`strategy_owner`, `strategy_name`) VALUES ('1','asia');
        $queryString = "INSERT INTO strategy('strategy_owner','strategy_name') VALUES"
                . "('"
                . "1"
                . "','"
                . $name
                . "');"
                . "";
        $result = $con->query($queryString);
        $con->close();
        $i = 0;


        for ($i = 0; $i < sizeof($array); $i++) {
            /*
             * nodeHolder.asset_type="null";
              nodeHolder.strategy_id=$(strategy).attr("id");
              nodeHolder.asset_id=name;
              nodeHolder.target_pct=target;
              nodeHolder.drift=drift;
              nodeHolder.current=current;
             * 
             */
            echo $array[$i]['strategy_id'];
            echo "\r\n";
            echo $array[$i]['asset_id'];
            echo "\r\n";
            echo $array[$i]['target_pct'];
            echo "\r\n";
            echo $array[$i]['drift'];
            echo "\r\n";
            echo $array[$i]['current'];
            echo "\r\n";
        }
    }

    public function createAsset() {
        $con = $this->getDBConnection();
        $result = $con->query("SELECT ItemID,Title,Quantity,Description FROM item ORDER BY ItemID");
    }

    /*
     *  
     * 
     * 
     */
}

?>