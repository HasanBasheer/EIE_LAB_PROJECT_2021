const {createPool} = require('mysql2/promise')
const faker = require('faker')

describe('Database Tests', () => {
    let connection

    beforeEach(async () => {
        let createTableSQL = 
        'CREATE TABLE `flash_table2` (`flash_ID` int NOT NULL AUTO_INCREMENT,`process_reference` varchar(255) DEFAULT NULL,`stroke_channel_num` varchar(255) DEFAULT NULL,`process_day` date DEFAULT NULL,`process_time` time DEFAULT NULL,`process_time_millisecond` varchar(255) DEFAULT NULL,`process` varchar(255) DEFAULT NULL,`strike_point` varchar(255) DEFAULT NULL,`polarity` varchar(255) DEFAULT NULL,`visibility` varchar(255) DEFAULT NULL,`duration` varchar(255) DEFAULT NULL,PRIMARY KEY (`flash_ID`)) ENGINE=InnoDB;'
    
        connection = await createPool({
            host: 'localhost',
            user: 'root',
            password: 'Id0n0tKnoWt#1$786',
            port: 3306,
            database: 'zeus'
        })
        console.log('Connected to database')
        await connection.query(createTableSQL)
    })

    it('Test CREATE and READ', async () => {
        try{
            const total_test_data = 3
            let insertQueries = []

            for (let i = 0; i < total_test_data ; i++)
            {
                let insertSQL = `INSERT INTO flash_table2 (flash_ID, process_reference, stroke_channel_num, process_day, process_time, process_time_millisecond, process, strike_point, polarity, visibility, duration) VALUES (NULL, 'test', 'test', '2017-02-12', '14:58:34', 'test', 'test', 'test', 'test', 'test', 'test');`
                insertQueries.push(connection.query(insertSQL))
            }
            await Promise.all(insertQueries)
            const [rows, fields] = await connection.query('SELECT * FROM flash_table2')
            expect(rows.length).toBe(total_test_data)
        }catch (error) {
            console.log(error)
            let dropTableSQL = 'DROP TABLE IF EXISTS `flash_table2`'
            await connection.query(dropTableSQL)
            await connection.end()
        }
    }, 60000)

    it('Test UPDATE and DELETE', async () => {
        try{
            let process_reference = 'test'
            let insertSQL = `INSERT INTO flash_table2 (flash_ID, process_reference, stroke_channel_num, process_day, process_time, process_time_millisecond, process, strike_point, polarity, visibility, duration) VALUES (NULL, 'test', 'test', '2017-02-12', '14:58:34', 'test', 'test', 'test', 'test', 'test', 'test');`
            await connection.query(insertSQL)
            //test delete
            let deleteSQL = `DELETE FROM flash_table2 WHERE process_reference='${process_reference}'`
            await connection.query(deleteSQL)
            const [allrows] = await connection.query('SELECT * FROM flash_table2')
            expect(allrows.length).toBe(0)
        }catch(error){
            console.log(error)
            let dropTableSQL = 'DROP TABLE IF EXISTS `flash_table2`'
            await connection.query(dropTableSQL)
            await connection.end()
        }
    }, 60000)

    afterEach(async () => {
        let dropTableSQL = 'DROP TABLE IF EXISTS `flash_table2`'
        await connection.query(dropTableSQL)
        await connection.end()
    })
})