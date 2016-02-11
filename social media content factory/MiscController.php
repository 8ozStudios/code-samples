<?php

class Common_MiscController extends Model_CustomController
{

    public function init()
    {
        //
    }

    public function contentfactoryAction()
    {
        if($this->getRequest()->getActionName() != 'deny')
        {
            $pass = false;
            $session = new Zend_Session_Namespace('login');
            if($session->user)
            {
                if($session->user->isCommunityAdmin())
                {
                    $pass = true;
                }
            }
            if(!$pass)
            {
                $this->forward('deny', 'misc', 'common');
            }
        }

        $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
        $this->view->domain = $protocol . '://' . $_SERVER['HTTP_HOST'];

        $classified = new Model_DbTable_Classified_Classified();
        $this->view->classifieds = $classified->search($this->_request, 5);

        $criteria = new Model_Contracts_EventCriteria();
        $criteria->start = mktime(0,0,0,date("m"),date("d"),date("Y"));
        $criteria->end = mktime(0,0,0,date("m")+11,date("d"),date("Y"));
        $criteria->limit = 5;
        $event = new Model_DbTable_Event();
        $this->view->events = $event->getPlatformEvents($criteria);

        $libraryArray = array();
        $proclib = new Model_Proclib();
        $q = "SELECT ID,Name from nccs_links.LINKS WHERE platform = '" . $_SESSION['dbstate'] . "' AND isDeleted = '0' AND Publish = 'Y' AND (GroupID < 1 || GroupID IS NULL) AND (ProjectID < 1 || ProjectID IS NULL) AND (GroupEdit LIKE '' or GroupEdit IS NULL) ORDER BY IFNULL(`ChangedDate`, `AddedDate`) DESC limit 5";
        $results = $proclib->runSql($q);
        $numRecs = mysql_num_rows($results);
        $numRecs = ($numRecs > 5) ? 5 : $numRecs;
        for ($i = 0; $i < $numRecs; $i++) {
            array_push($libraryArray, mysql_fetch_array($results));
        }
        $this->view->libraryitems = $libraryArray;

        $suggestedArray = array();
        $proclib = new Model_Proclib();
        $q = "SELECT l.ID,l.Name from nccs_links.LINKS as l LEFT JOIN communityneeds.taggeditem as t ON t.KnowledgebaseId = l.ID WHERE t.tagId = 2189 AND l.isDeleted = '0' AND l.Publish = 'Y' AND (l.GroupID < 1 || l.GroupID IS NULL) AND (l.ProjectID < 1 || l.ProjectID IS NULL) AND (l.GroupEdit LIKE '' or l.GroupEdit IS NULL)ORDER BY IFNULL(`ChangedDate`, `AddedDate`) DESC limit 5";
        $results = $proclib->runSql($q);
        $numRecs = mysql_num_rows($results);
        $numRecs = ($numRecs > 5) ? 5 : $numRecs;
        for ($i = 0; $i < $numRecs; $i++) {
            array_push($suggestedArray, mysql_fetch_array($results));
        }
        $this->view->suggesteditems = $suggestedArray;

        $this->view->organizations1 = array();
        if( $this->communityConfig->directoryVersion < 1 ){
            $organizationsNoEin = new Model_DbTable_OrganizationNoEin();
            $organizationsNoEinArray = $organizationsNoEin->getRecentlyUpdatedOrganizations(3);

            $organizationsAllEin = new Model_DbTable_Organization();
            $organizationsAllEinArray = $organizationsAllEin->getRecentlyUpdatedOrganizations(3);

            $organizations = array_merge($organizationsNoEinArray, $organizationsAllEinArray);

            foreach ($organizations as $key => $row) {
                $date[$key]  = $row['date'];
            }

            array_multisort($date, SORT_DESC, $organizations);

            $this->view->organizations1 = $organizations;
        } else {
            $organizations = new Model_DbTable_OrganizationNoEinExtended();
            $this->view->organizations2 = $organizations->getRecentlyUpdatedOrganizations(5);
        }

    }

}
