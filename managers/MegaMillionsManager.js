const axios = require('axios');
const cheerio = require('cheerio');
const DrawingsRepo = require('../models/Drawings');

exports.saveData = async() => {

};

exports.loadData = async() => {
    debugger;
    for (let i = 0; i < 40; i++){
        await loadDataByPage(i);
    }
}

exports.getPageHtml = async(pageNumber) => {
    console.log("loading date..");

    const response = await axios.get(`https://www.tnlottery.com/winning-numbers/mega-millions?page=${pageNumber}`);
    return response.data;
};

const loadDataByPage = async(pageNumber) =>{
        // load data served as html from tn lottery site
        const html =  await this.getPageHtml(pageNumber);
        // Load the HTML code as a string, which returns a Cheerio instance
        const $ = cheerio.load(html);
        const drawings =  [];
        $('.winning-number-table').each((i, elem)=>{
            //megaplier
            const megaplier = $(elem).find('.views-field-field-special-multiplier .field-content').text();
    
            // winning numbers
            const winningNumber1 = $(elem).find('.views-field-field-winning-number-1 .field-content').text();
            const winningNumber2 = $(elem).find('.views-field-field-winning-number-2 .field-content').text();
            const winningNumber3= $(elem).find('.views-field-field-winning-number-3 .field-content').text();
            const winningNumber4 = $(elem).find('.views-field-field-winning-number-4 .field-content').text();
            const winningNumber5 = $(elem).find('.views-field-field-winning-number-5 .field-content').text();
            const winningNumbers = [winningNumber1, winningNumber2, winningNumber3, winningNumber4, winningNumber5];
            
            const megaBallNumber = $(elem).find('.views-field-field-special-number .field-content').text();

            // winner results
            const results = [];
    
            // $(elem).find('tr').each((index,elem2) => {
                for (let i = 1; i <= 9; i++){
                    const payout = $(elem).find(`.views-field-field-win-type-level-${i}-payout .field-content`).text();
                    const typeOfWin = $(elem).find(`.views-field-field-win-type-level-${i}-name .field-content`).text();
                    const winnerCount = $(elem).find(`.views-field-field-win-type-level-${i}-winners-1 .field-content`).text();
                    const bonusWinnerCount = $(elem).find(`.views-field-field-win-type-level-${i}-winners-2 .field-content`).text();
                    
                    const result = {
                        win_type: typeOfWin,
                        winner_count: winnerCount,
                        bonus_winner_count: bonusWinnerCount,
                        payout: payout
                    };
    
                    results.push(result);
                }
            // });
    
            // get date
            const dateTimeString = $(elem).find("time").attr('datetime');
    
            const drawing = {
                megaplier: megaplier,
                winning_numbers: winningNumbers,
                bonus_number: megaBallNumber,
                date: dateTimeString,
                results: results
            };
            drawings.push(drawing);
        });
    
        debugger;
        await DrawingsRepo.insertMany(drawings, (err)=>{console.log('something happend...' + err)});
    
};