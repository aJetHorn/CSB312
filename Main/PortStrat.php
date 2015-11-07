<?php

// - Wellesley Arreza
//Strategy_ID, Pfolio_Strat_ID, Portfolio_ID, Pfolio_Allocation, Strategy_Name
class PortStrat {

    public $id;
    public $sname;
    public $sid;
    public $pallocation;
    public $pid;

    function __construct($sid, $id, $pid, $palloc, $sname) {
        $this->id = $id;
        $this->sname = $sname;
        $this->sid = $sid;
        $this->pallocation = $palloc;
        $this->pid = $pid;
    }

    function getId() {
        return $this->id;
    }

    function setId($id) {
        $this->id = $id;
    }

    function getSname() {
        return $this->sname;
    }

    function getSid() {
        return $this->sid;
    }

    function getPallocation() {
        return $this->pallocation;
    }

    function getPid() {
        return $this->pid;
    }

    function setSname($sname) {
        $this->sname = $sname;
    }

    function setSid($sid) {
        $this->sid = $sid;
    }

    function setPallocation($pallocation) {
        $this->pallocation = $pallocation;
    }

    function setPid($pid) {
        $this->pid = $pid;
    }

}

?>
