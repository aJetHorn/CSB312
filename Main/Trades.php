<?php
// - Wellesley Arreza
class Trades {
    public $asset_id;
    public $value;
    public $date;
    public $action;
    function __construct($asset_id, $value, $date, $action) {
        $this->asset_id = $asset_id;
        $this->value = $value;
        $this->date = $date;
        $this->action = $action;
    }
    function getAsset_id() {
        return $this->asset_id;
    }

    function getValue() {
        return $this->value;
    }

    function getDate() {
        return $this->date;
    }

    function setAsset_id($asset_id) {
        $this->asset_id = $asset_id;
    }

    function setValue($value) {
        $this->value = $value;
    }

    function setDate($date) {
        $this->date = $date;
    }

    function getAction() {
        return $this->action;
    }

    function setAction($action) {
        $this->action = $action;
    }




}
?>
