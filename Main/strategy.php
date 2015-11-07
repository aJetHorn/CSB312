


<?php
// this is the strategy class that models a simple strategy
// for strategy creation
// - Wellesley Arreza
class Strategy {
    public $id;
    public $name;
    public $allocation;
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
    
    public function getAllocation() {
        return $this->allocation;
    }
    
    public function setAllocation() {
        return $this->allocation;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }




}
?>

