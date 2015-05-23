/**
 * Created by sbhask1 on 5/10/15.
 */

var request = require('request');
var log = sails.log;
var cheerio = require('cheerio');


function fetchPageNamesFromSheKnows(urlSuffix, cb){

  var result=[];
  request({
      url : 'http://www.sheknows.com/baby-names/' + urlSuffix, //baby-girl-names/page:1
      method : 'GET'
    },
    function (err, res, body) {
      //log.info('body: ', body);
      if (!err && res.statusCode === 200) {
        var $=cheerio.load(body);
        var found=false;
        $('.name-list .bd li').map(function(i, foo) {
          // the foo html element into a cheerio object (same pattern as jQuery)
          //log.info('foo: ', $(foo).html());
          var nm = $('.title a', this).text().trim();
          var mn = $('.blurb', this).text().trim();
          var type = $('.related a', this).text().trim();

          result.push({
            name: nm,
            meaning: mn,
            type: type
          });

          found=true;
        });
        log.info('Names found: ', found);
      } else {
        if (err) {
          log.error('Error in getting Names ', err);
        } else {
          log.error('Http Response Error in Names ', res);
        }
      }
      if (cb) cb(result, found, err);
    }
  );


}

function fetchAllNamesFromSheKnows(urlSuffix, gender, pageIdx, onlyPage, cb){
  log.info('fetchAllNamesFromSheKnows starts ', urlSuffix, gender, pageIdx);
  if(onlyPage){
    fetchPageNamesFromSheKnows(urlSuffix+'/page:' + pageIdx,function(result, fd, err){
      if(!fd || !result || result.length==0 || err){
        log.info('Not found result: ', result);
        found=false;
      }else{
        log.info('result: ', result);
        insertIndianNames(result, gender);
        pageIdx++;
        fetchAllNamesFromSheKnows(urlSuffix, gender, pageIdx, onlyPage, cb);
        return;
      }
    });

  }
  if (cb) cb();

}

function isIndian(type){
  if(type && (type.search(/Indian/i)!==-1
  || type.search(/Hindi/i)!==-1 )){
    return true;
  }
  return false;
}

function insertIndianNames(results, gender){
  _.forEach(results, function(result) {
    if(isIndian(result.type)){
      log.info(' Inserting name :', result);
      Name.create({
        nm: result.name,
        dc: result.meaning,
        tp: 'in',
        sx: gender
      }).exec(function (err, name) {
        if (err) {
          log.error(err);
        }
      });
    }

  });
}


function fetchPageNamesFromBachpan(urlSuffix, cb){
  var result=[];
  request({
      url : 'http://www.bachpan.com/' + urlSuffix, //Modern-Indian-Boy-Names-A.aspx?page=1
      method : 'GET'
    },
    function (err, res, body) {
      //log.info('body: ', body);
      if (!err && res.statusCode === 200) {
        var $=cheerio.load(body);
        var found=false;
        $('.tbl-one .table-responsivex .table tr').map(function(i, foo) {
          // the foo html element into a cheerio object (same pattern as jQuery)
          //log.info('foo: ', $(foo).html());
          if($('.c1 a', this).text()){
            var nm = $('.c1 a', this).text().trim();
            var mn = $('.c2 .tblMeaning a', this).text().trim();
            var gender = $('.c4', this).text().trim();
            var numerology = $('.c3', this).text().trim();
            if(nm!==''){
              result.push({
                name: nm,
                meaning: mn,
                gender: gender==='Boy'?'b':'g',
                numerology: numerology
              });
            }

          }
          found=true;
        });
        log.info('Names found: ', found);
      } else {
        if (err) {
          log.error('Error in getting Names ', err);
        } else {
          log.error('Http Response Error in Names ', res);
        }
      }
      if (cb) cb(result, found, err);
    }
  );

}


function fetchAllNamesFromBachpan(urlSuffix, pageIdx, cb){
  log.info('fetchAllNamesFromBachpan starts ', urlSuffix, pageIdx);

  fetchPageNamesFromBachpan(urlSuffix+'?page=' + pageIdx,function(result, fd, err){
    if(!fd || !result || result.length==0 || err){
      log.info('Not found result: ', result);
      found=false;
    }else{
      log.info('result: ', result);
      insertIndianNamesBachPan(result);
      pageIdx++;
      fetchAllNamesFromBachpan(urlSuffix, pageIdx, cb);
      return;
    }
  });


  if (cb) cb();

}

function insertIndianNamesBachPan(results){
  _.forEach(results, function(result) {

      log.info(' Inserting name :', result);
      Name.create({
        nm: result.name,
        dc: result.meaning,
        tp: 'in',
        sx: result.gender,
        num: result.numerology,
        src:'bp'
      }).exec(function (err, name) {
        if (err) {
          log.error(err);
        }
      });


  });
}

function fetchNamesFromBachpan(cb){
  log.info('fetchNamesFromBachpan starts ');

  for (i = 65; i <= 90; i++) {
    fetchAllNamesFromBachpan('Modern-Indian-Boy-Names-' + String.fromCharCode(i) + '.aspx', 1);
    fetchAllNamesFromBachpan('Modern-Indian-Girl-Names-' + String.fromCharCode(i) + '.aspx', 1);
  }
  if (cb) cb();

}


module.exports = {

  fetchPageNamesFromSheKnows: fetchPageNamesFromSheKnows,

  fetchAllNamesFromSheKnows: fetchAllNamesFromSheKnows,

  fetchPageNamesFromBachpan: fetchPageNamesFromBachpan,

  fetchNamesFromBachpan: fetchNamesFromBachpan

};
