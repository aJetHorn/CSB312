


<?php
// class for Node
// Node_ID,Node_Name,Parent_Node_ID,Strategy_ID,Target_Pct
class Strategy {
    public $id;
    public $name;
    function __construct($id, $name) {
        $this->id = $id;
        $this->name = $name;
    }
    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }




}
?>

