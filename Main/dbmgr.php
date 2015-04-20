
<?php

require 'node.php';

class Dbmgr {

    private $_mysqli;

    public function __construct() {
        echo 'The class "', __CLASS__, '" was initiated!<br />';
    }

    public function __destruct() {
        echo 'The class "', __CLASS__, '" was ended. Destructor called. This is a good thing.<br />';
    }

    public function getDBConnection() {
        if (!isset($_mysqli)) {
            //$_mysqli = new mysqli("localhost", "", "", "sei", 3306);
            $_mysqli = new mysqli("192.186.225.167", "wra216", "csb312", "CSB312", 3306);
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

        while ($row = $result->fetch_row()) {
        $i = 0;

            $rec = new Item($row[0], $row[1], $row[2], $row[3]);
            $lst[$i++] = $rec;
        }


        return $lst;
    }
    
    // unit test
            //http://php.net/manual/en/mysqli.insert-id.php
        //http://stackoverflow.com/questions/8701885/php-mysql-get-autoincremented-value-after-insert
    public function createStratID($name,$con){
        $queryString = "INSERT INTO Strategy(strategy_owner,strategy_name) VALUES"
                . "('"
                . "1"
                . "','"
                . $name
                . "');"
                . "";
        $result = $con->query($queryString);
        $strategyID=$con->insert_id;
        echo ($strategyID);
        return $strategyID;
    }
    

    public function storeStrategy() {

        $con = $this->getDBConnection();
        $array = $_POST['tree'];
        //echo var_dump($array);
        $name = $_POST['name']; // strategy name
        // query for creating strategy
        // node_id, asset_type, strategy_id, asset_id, target_pct
        // for each object
        //INSERT INTO `strategy`(`strategy_owner`, `strategy_name`) VALUES ('1','asia');
        
        $strategyID=$this->createStratID($name,$con);
        //echo "last auto increment value" . $con->insert_id;
        
        
        $i = 0;
        // iteration 0 is the name of the strategy. Skipp this.
        for ($i = 1; $i < sizeof($array); $i++) {
            /*
             * nodeHolder.asset_type="null";
              nodeHolder.strategy_id=$(strategy).attr("id");
              nodeHolder.asset_id=name;
              nodeHolder.target_pct=target;
              nodeHolder.drift=drift;
              nodeHolder.current=current;
             * 
             */
            /*
            echo $array[$i]['strategy_id'];
            echo "\r\n";
            echo $array[$i]['asset_id'];
            echo "\r\n";
            echo $array[$i]['target_pct'];
            echo "\r\n";
            echo $array[$i]['drift'];
            echo "\r\n";
            echo $array[$i]['current'];
            echo "\r\n";*/
            $nodeID=$array[$i]['node_id'];
            $assetID= $array[$i]['asset_id'];
            $target= $array[$i]['target_pct'];
            $name=$array[$i]['name'];
            $parent= $array[$i]['parent']; // parent id.
            echo "\r\n";
            echo $parent; echo $nodeID;
            echo "\r\n";
            echo "iteration : " . $i;
            $insertNode="INSERT INTO Node(Node_ID,Node_Name,Strategy_ID,Target_Pct, Parent_Node_ID) VALUES("
                    . "'" . $nodeID . "',"
                    . "'" . $name . "',"
                    . "'" . $strategyID . "',"
                  
                    . "'" . $target . "',"
                    . "'" . $parent . "'" // last value
               
                    . ");";
            
            
            $con->query($insertNode);
            
            sleep(.1); // provide some extra time for query to run.
            
        }
        
        $con->close();
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