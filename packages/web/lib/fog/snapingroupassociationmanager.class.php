<?php
/**
 * Snapin group association manager class.
 *
 * PHP version 5
 *
 * @category SnapinGroupAssociationManager
 * @package  FOGProject
 * @author   Tom Elliott <tommygunsster@gmail.com>
 * @license  http://opensource.org/licenses/gpl-3.0 GPLv3
 * @link     https://fogproject.org
 */
/**
 * Snapin group association manager class.
 *
 * @category SnapinGroupAssociationManager
 * @package  FOGProject
 * @author   Tom Elliott <tommygunsster@gmail.com>
 * @license  http://opensource.org/licenses/gpl-3.0 GPLv3
 * @link     https://fogproject.org
 */
class SnapinGroupAssociationManager extends FOGManagerController
{
    /**
     * The base table name.
     *
     * @var string
     */
    public $tablename = 'dirCleaner';
    /**
     * Install our table.
     *
     * @return bool
     */
    public function install()
    {
        $this->uninstall();
        $sql = Schema::createTable(
            $this->tablename,
            true,
            [
                'dcID',
                'dcPath'
            ],
            [
                'INTEGER',
                'LONGTEXT'
            ],
            [
                false,
                false
            ],
            [
                false,
                false
            ],
            [
                'dcID',
                'dcPath'
            ],
            'MyISAM',
            'utf8',
            'dcID',
            'dcID'
        );
        return self::$DB->query($sql);
    }
}
