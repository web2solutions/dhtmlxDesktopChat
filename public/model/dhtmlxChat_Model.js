var dhtmlxChat_Model = (function(){
	var schema = {
		 "channel" : {
			channel_id : ''
			, date_created : ''
			, private : false
			, name : ''
			, owner_id : ''
			, online_users : []
		}
		, "user" : {
			user_id : ''
			, date_created : ''
			, name : ''
			, nick : ''
			, email : ''
			, password : ''
			, favorites : []
			, ignore : []
		}
		, "black_list" : {
			words : [
				'ass'
				,'fuck'
			]	
		}
	} 
	
	, API = {
		
	};
	
	return API;
})();
