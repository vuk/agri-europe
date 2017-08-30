<?php
/*
Plugin Name: MK Group WordPress CMS Extension
Plugin URI:
Description: Plugin built specifically for MK Group in order to provide required extension of WordPress functionality
Version: 0.1-beta
Author: Vuk Stankovic
Author URI: http://vukstankovic.com
License: Proprietary
Text Domain: mkgroup
*/
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
require_once __DIR__ . '/vendor/autoload.php';

use MkGroup\Company;
use MkGroup\People;
use MkGroup\APIExtend;

class Mk {

	private $companies;
	private $people;
	private $rest;

	public function __construct()
	{
		$this->companies = new Company();
		$this->people = new People();
		$this->rest = new APIExtend();
		load_plugin_textdomain('mkgroup', false, basename( dirname( __FILE__ ) ) . '/languages' );
		add_action( 'init', array($this, 'hookCompanies') );
		add_action( 'init', array($this, 'hookPeople') );
		$this->rest->addOptionsEndpoint();
		$this->rest->addOptionEndpoint();
		$this->rest->addSlideEndpoint();
	}

	public function hookCompanies () {
		/*$this->companies->addCompanies();
		$this->companies->addCompanyCategories();*/
	}

	public function hookPeople () {
		/*$this->people->addPeople();
		$this->people->addPeopleGroups();*/
	}
}

$mkGroup = new Mk();