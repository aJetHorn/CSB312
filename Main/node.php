


<?php
// class for Node
// Node_ID,Node_Name,Parent_Node_ID,Strategy_ID,Target_Pct
// used for the dbmgr.
// Wellesley Arreza
class Node implements JsonSerializable {
    public $id;
    public $name;
    public $parent;
    public $strategyID;
    public $targetpct;
    function __construct($id, $name, $parent, $strategyID, $targetpct) {
        $this->id = $id;
        $this->name = $name;
        $this->parent = $parent;
        $this->strategyID = $strategyID;
        $this->targetpct = $targetpct;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getParent() {
        return $this->parent;
    }

    public function getStrategyID() {
        return $this->strategyID;
    }

    public function getTargetpct() {
        return $this->targetpct;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setParent($parent) {
        $this->parent = $parent;
    }

    public function setStrategyID($strategyID) {
        $this->strategyID = $strategyID;
    }

    public function setTargetpct($targetpct) {
        $this->targetpct = $targetpct;
    }

    public function jsonSerialize() {
        return (object) get_object_vars($this);
    }

}
?>

