/**
 * @constructor
 * dhtmlxChat application controller
 */




var dhtmlxChat = {
	
	appName: "dhtmlxChat"

	,
	version: 0.1

	,
	uid: null

	,
	window_manager: null

	,
	data_store: []

	,
	gridQString: [] //we'll save here the last url with query string we used for loading grid (see step 5 for details) we'll use this script block for functions

	,
	window: [],
	window_print: [],
	layout: [],
	layout2: [],
	toolbar: [],
	grid: [],
	status_bar: []
	
	,tab : []
	,form : []
	
	,skin : "dhx_skyblue"

	,online_person:{}
	
	,online_persons:[]

	,
	configuration: []
	
	,
	application_path : window.location.href.replace(/index.html/gi,'')+"/"
	
	,
	dhtmlx_codebase_path :window.location.href.replace(/index.html/gi,'')+"codebase4.4_std/"
	
	,
	icons_path : window.location.href.replace(/index.html/gi,'')+"icons/"
	
	,str_main_status : "<div><div id='status_info'>Initializing dhtmlxChat</div><div id='expiration_info' title='time remaining for token expiration' class='expiration_info'></div><div id='user_info'><img id='user_info_status' src='icons/offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='socket_info' class='data_transfer_info'>socket: disconnected</div></div>"
	
	,
	socket: null

	/**
	 * Description
	 * @method start
	 * @param {} configuration
	 * @return
	 */
	,
	start: function (configuration) {
		var self = this;

		//$dhx.init();

		self.uid = "dhtmlxChat_" + ((new Date()).getTime());


		window.dhx_globalImgPath = self.dhtmlx_codebase_path + "imgs/";
		dhtmlx.skin = self.settings.globalSkin || "dhx_skyblue";

		configuration["icons_path"] = "icons/";
		
		configuration['container'] = document.body;

		self.configuration[self.uid] = configuration;

		self.settings.globalImgPath = self.dhtmlx_codebase_path + "imgs/";
		self.settings.conf_window.image_path = self.icons_path;
		self.settings.conf_toolbar.icon_path = self.icons_path + "32px/";
		
		self.settings.conf_tabbar.image_path = self.dhtmlx_codebase_path + "imgs/";
		
					
		self.settings.conf_window.left = 50;
		self.settings.conf_window.top = 50;
		
		self.settings.conf_window_login.left = 50;
		self.settings.conf_window_login.top = 50;

		

		self.data_store[self.uid] = [];
		
		self._prompt_login( self.uid, function( user_hash )
		{
			if (self.configuration[self.uid].container) {
				self.settings.conf_layout.parent = self.configuration[self.uid].container;
			}
			else {
				self._window(self.uid);
			}
			
			self._layout(self.uid);
			self._tab(self.uid);
			self._form_user_properties(self.uid);
			self._dataView_public_messages(self.uid);
			self._dataView_online_users(self.uid);
			console.log("before socket");
			
			self.socket = $dhx.socket.connect(
			{
				resource : 	"ws://localhost:4080"
				//,pipe : "dhtmlxChat"
				,onOpen : function( messageEvent ){
					
					console.log("on open");
					
					self.progressOn(self.uid);
					self._setStatusSocket("connected");
					
					self.form_user_properties[ self.uid ].setFormData(user_hash);
					
					self.socket.Send( {
							type : 'new_username'// new_username, message, subscribe    -> mandatory
							,person : user_hash
							,message : ' '+user_hash["nick"]+' is online now'
					} );
			
					self._setStatus(
							"dhtmlxChat user is authorized."
					);
					self._setStatusDataTransfer(
						"credential received");
					self._setStatusUser(
						"Logged as " + user_hash["nick"], true
					);
					
					var date = new Date();
					elapseMe({year: date.getFullYear(), month: date.getMonth(),day: date.getDate(),targetId:"expiration_info", show : "hours,minutes,seconds"});  
					
									
					self._setStatus(
						"dhtmlxChat is ready."
					);
					
					self.progressOff(
						self.uid);
					
				}
				,onClose : function( messageEvent ){
					
				}
				,onBeforeClose : function( client_id ){
					//self.socket.Send("user " + self.getPersonByID( self.uid, client_id ).nick  + " - " + client_id + " is disconnecting");
				}
				,onBeforeSend : function( ){
					
				}
				,onMessage : function( data, messageEvent )
				{
					console.log("new message from server");
					console.log(data);
					console.log(messageEvent);
					//console.log(messageEvent.data);
					//console.log( self.socket.getClientID() );
					var data = JSON.parse(messageEvent.data);				
					if (data.type && data.type == "hippie.pipe.set_client_id") {

					}
					
					if (data.type && data.type == "new_username") {
						
						self.dataView_online_users[self.uid].clearAll();
						
						//console.log( self.socket.getClientID() );
						data.users.forEach(function (person, index, array) {
							
							var user = {
								"id": person.client_id,
								"avatar": "<img width='18px' src='" + dhtmlxChat.application_path + "assets/"+person.gender+".png'>",
								"nick": person.nick,
								"gender": person.gender
								//"message": "my message",
							};
							
							self.dataView_online_users[self.uid].add(user, 0);	
							
							if( typeof self.online_persons[ self.uid ] === 'undefined')
								self.online_persons[ self.uid ] = [];
							
							self.online_persons[ self.uid ].push( user );	
						});
						
						document.getElementById('new_user').play();
						
						
					}
					
					if (data.type && data.type == "disconnect") {
						
						document.getElementById('disconnect').play();
						
						self.dataView_online_users[self.uid].remove(data.client_id);
						
						for(var x = 0; x < self.online_persons[ self.uid ].length; x++)
						{
							var personObj = self.online_persons[ self.uid ][ x ];
							if( personObj.client_id == data.client_id )
							{
								self.online_persons[ self.uid ].splice(x, 1);
							}
						}
						
						
						
					}
					
					if (data.message) {
						//console.log(data.msg);
						//self._setStatusSocket("new message");
						
						document.getElementById('new_message').play();
						
						var d = new Date();
						var time = d.toLocaleTimeString();
						
						self.dataView_public_messages[ self.uid ].add({
							"id": messageEvent.timeStamp,
							"avatar": "<img width='18px' src='" + dhtmlxChat.application_path + "assets/"+self.getPersonByID( self.uid, data.client_id ).gender+".png'>",
							"nick":self.getPersonByID( self.uid, data.client_id ).nick,
							"gender": self.getPersonByID( self.uid, data.client_id ).gender,
							"message": time + " - " + data.message,
						}, 0);	
						
						//notify(data.msg);
						
						
						
					}
				}
				,onError : function( error ){
					console.log( error );
					self._setStatusSocket("server offline", true);
				}
			});
			
			
			
			
		} );
	}
	
	,_prompt_login : function( uid, callBackSuccessLogin ){
		var self = this;
		self._window_login(uid);
		self._form_login(uid, callBackSuccessLogin);
	}
	
	,getPersonByID : function( uid, client_id ){
		self = this;
		//console.log( client_id );
		var adminPerson = {
			nick : "dhtmlxChat",
			gender : "system"
		}
		
		var found_person = adminPerson;
		
		self.online_persons[ uid ].forEach(function (person, index, array) {
			//console.log( person );
			if( person.id && person.id.toString() == client_id.toString())
			{
				found_person = person;
			}
		});
		return found_person;
	}
	
	
	,nickNameAlreadyInUse : function( uid, nick ){
		self = this;
		//console.log( client_id );
		var in_use = false;
		
		var found_person = adminPerson;
		
		self.online_persons[ uid ].forEach(function (person, index, array) {
			//console.log( person );
			if( person.nick && person.nick.toString() == nick.toString())
			{
				in_use = true;
			}
		});
		return in_use;
	}
	
	

	,
	/**
	 * Description
	 * @method _window_manager
	 * @return
	 */
	_window_manager: function () {
		var self = this;
		self.window_manager = new dhtmlXWindows();
		//self.window_manager.setImagePath(self.settings.conf_window.image_path); // deprecated on dhtmlx4.0
	}

	,
	/**
	 * Description
	 * @method _window
	 * @param {} uid
	 * @return
	 */
	_window: function (uid) {
		var self = this;

		if (self.window_manager === null)
			self._window_manager();

		if (self.window_manager.isWindow("window_dhtmlxChat_" + uid))

		{
			self.window[uid].show();
			self.window[uid].bringToTop();
			return;
		}
		self.window[uid] = self.window_manager.createWindow("window_dhtmlxChat_" + uid, self.settings.conf_window.left + 10,
			self.settings.conf_window.top + 10, self.settings.conf_window.width, self.settings.conf_window.height);
		self.window[uid].setText(self.settings.text_labels.main_window_title);
		//self.window[uid].setIcon(self.settings.conf_window.icon, self.settings.conf_window.icon_dis);

		self.window[uid].attachEvent("onClose", function (win) {
			
			return true;
		});

		self.status_bar[uid] = self.window[uid].attachStatusBar();
		self.status_bar[uid].setText(self.str_main_status);
	}
	
	,window_login : []
	,status_bar_login : []
	,
	/**
	 * Description
	 * @method _window_login
	 * @param {} uid
	 * @return
	 */
	_window_login: function (uid) {
		var self = this;

		if (self.window_manager === null)
			self._window_manager();

		if (self.window_manager.isWindow("window_login_dhtmlxChat_" + uid))

		{
			self.window_login[uid].show();
			self.window_login[uid].bringToTop();
			return;
		}
		self.window_login[uid] = self.window_manager.createWindow(
			"window_login_dhtmlxChat_" + uid
			, self.settings.conf_window_login.left
			, self.settings.conf_window_login.top
			, self.settings.conf_window_login.width
			, self.settings.conf_window_login.height
		);
		self.window_login[uid].setText("Login");
		
		self.window_login[uid].center();
		
		//self.window_login[uid].setIcon(self.settings.conf_window_login.icon, self.settings.conf_window_login.icon_dis);  // deprecated on dhtmlx4.0

		self.window_login[uid].attachEvent("onClose", function (win) {
			
			return true;
		});

		self.status_bar_login[uid] = self.window_login[uid].attachStatusBar();
		self.status_bar_login[uid].setText("");
	}

	,
	/**
	 * Description
	 * @method _layout
	 * @param {} uid
	 * @return
	 */
	_layout: function (uid) {
		var self = this;	

		if (self.configuration[uid].container) {		
			self.layout[uid] = new dhtmlXLayoutObject( self.settings.conf_layout );
			self.status_bar[uid] = self.layout[uid].attachStatusBar();
			self.status_bar[uid].setText(self.str_main_status);
		}
		else {
			self.layout[uid] = self.window[uid].attachLayout( self.settings.conf_layout );
		}
		
		self._layout2(uid);
		

		//self.layout2[uid].cells("a").hideHeader();
		//self.status_bar_paging[uid] = self.layout2[uid].cells("a").attachStatusBar();
		//self.status_bar_paging[uid].setText("<div id='recinfoArea'></div>");
	}
	
	,
	/**
	 * Description
	 * @method _layout
	 * @param {} uid
	 * @return
	 */
	_layout2: function (uid) {
		var self = this;	

		self.layout2[uid] = self.layout[uid].cells("a").attachLayout( {
			"pattern": "2E",
			cells: [
						{id: "a", text: "Navigation", width: 100, header: false, fix_size: [true, null]},
						{id: "b", text: "Send message", height: 180},
			]} 
		);
		
		self._form_message( uid );
		

		//self.layout2[uid].cells("a").hideHeader();
		//self.status_bar_paging[uid] = self.layout2[uid].cells("a").attachStatusBar();
		//self.status_bar_paging[uid].setText("<div id='recinfoArea'></div>");
	}
	
	

	,
	/**
	 * Description
	 * @method _toolbar
	 * @param {} uid
	 * @return
	 */
	_toolbar: function (uid) {
		var self = this;

		self.toolbar[uid] = self.layout[uid].cells("a").attachToolbar(self.settings.conf_toolbar);
		self.toolbar[uid].setIconSize(32);
		self.toolbar[uid].attachEvent("onClick", function (id) {
			if (id == "new_form") {
				
			}
			
		});
	}
	
	,_tab: function (uid) {
		var self = this;

		self.tab[uid] = self.layout2[uid].cells("a").attachTabbar();

		self.tab[uid].setSkin(self.skin);
		//self.tab[uid].setImagePath(self.settings.conf_tabbar.image_path); // self.application_path // deprecated on dhtmlx4.0
		//self.tab[uid].enableScroll(true);
		self.tab[uid].enableAutoReSize(true);
		self.tab[uid].addTab("start_tab", "public channel", "150px");
		//self.tab[uid].hideTab("start_tab", true);
		
		//self.tab[uid].setTabActive("start_tab"); // deprecated on dhtmlx4.0
		self.tab[uid].tabs("start_tab").setActive();

		self.tab[uid].attachEvent("onSelect", function (idd, last_id) {
			return true;
		});
	}
	
	,
	status_bar_dataView_public_messages: []
	,dataView_public_messages:[]
	,
	/**
	 * Description
	 * @method _dataView_public_messages
	 * @param {} uid
	 * @return
	 */
	_dataView_public_messages: function (uid) {
		var self = this;
		self.dataView_public_messages[uid] = self.tab[uid].tabs("start_tab").attachDataView(self.settings.conf_dataView_public_messages.settings);
		self.dataView_public_messages[uid].parse(self.settings.conf_dataView_public_messages.data, "json");
		
		self.dataView_public_messages[uid].attachEvent("onItemDblClick", function (id, ev, html){
		  	console.log( id );
		   	return true;
	  	});

		self.status_bar_dataView_public_messages[uid] = self.tab[uid].tabs("start_tab").attachStatusBar();
		self.status_bar_dataView_public_messages[uid].setText("<div class='red_warning'> <img src ='" + self.settings.conf_window.image_path + "warning4.png'>  </div>");
	}
	
	
	
	
	,
	status_bar_dataView_online_users: []
	,dataView_online_users:[]
	,
	/**
	 * Description
	 * @method _dataView_online_users
	 * @param {} uid
	 * @return
	 */
	_dataView_online_users: function (uid) {
		var self = this;
		self.dataView_online_users[uid] = self.layout[uid].cells("b").attachDataView(self.settings.conf_dataView_online_users.settings);
		self.dataView_online_users[uid].parse(self.settings.conf_dataView_online_users.data, "json");
		
		self.dataView_online_users[uid].attachEvent("onItemDblClick", function (id, ev, html){
		  	console.log( id );
		   	return true;
	  	});

		self.status_bar_dataView_online_users[uid] = self.layout[uid].cells("b").attachStatusBar();
		self.status_bar_dataView_online_users[uid].setText("<div class='red_warning'> <img src ='" + self.settings.conf_window.image_path + "warning4.png'> </div>");
	}

	,
	/**
	 * Description
	 * @method _form
	 * @param {} uid
	 * @return
	 */
	_form: function (uid) {
		var self = this,
			skin = self.skin;
		dhtmlx.skin = skin || "dhx_skyblue";
		self.form[ uid ] = self.layout[uid].cells("c").attachForm(self.settings.conf_form.template);
	}
	
	,form_login : []
	,
	/**
	 * Description
	 * @method _form
	 * @param {} uid
	 * @return
	 */
	_form_login: function (uid, callBackSuccessLogin) {
		var self = this,
			skin = self.skin;
			
		dhtmlx.skin = skin || "dhx_skyblue";
		

		self.form_login[ uid ] = self.window_login[uid].attachForm(self.settings.conf_form_login.template);
		//self.form[ uid ].setSkin(skin);
		
		self.form_login[ uid ].attachEvent("onButtonClick", function(name){
			if(name == "proceed")
			{
				var hash = self.form_login[ uid ].getFormData();
				var nick = hash[ "nick" ];
				var gender = hash[ "gender" ];
				self.online_person = hash;
				
				if( nick.length > 3 )
				{
					self.window_login[uid].close();
				
					if( callBackSuccessLogin ) callBackSuccessLogin( hash );
				}
				else
				{
					document.getElementById('error').play();
					dhtmlx.alert({
                            title:"login error!",
                            type:"alert-error",
                            text:"too short nick name"
                    });
				}
				
				
			}
			
		});


		//$dhx.dhtmlx.prepareForm(uid + "_form_dhtmlxChat_login", self.settings.conf_form_login, self.form_login[ uid ]);
		

	}
	
	,form_message : []
	,
	/**
	 * Description
	 * @method _form
	 * @param {} uid
	 * @return
	 */
	_form_message: function (uid) {
		var self = this,
			skin = self.skin;
			
		dhtmlx.skin = skin || "dhx_skyblue";
		

		self.form_message[ uid ] = self.layout2[uid].cells("b").attachForm(self.settings.conf_form_message.template);
		//self.form[ uid ].setSkin(skin);
		
		self.form_message[ uid ].attachEvent("onButtonClick", function(name)
		{
			if(name == "send")
			{
				var hash = self.form_message[ uid ].getFormData();
				var user_message = hash[ "message" ];
				
				if( user_message.length > 0 )
				{
					self.socket.Send( {
						type : 'message'// message, subscribe    -> mandatory
						,message : user_message
					} );
					
					self.form_message[ uid ].setFormData({ message : "" })
				}
				else
				{
					document.getElementById('error').play();
					dhtmlx.alert({
                            title:"send error!",
                            type:"alert-error",
                            text:"too short message"
                    });
				}
				
				
			}
			
		});


		//$dhx.dhtmlx.prepareForm(uid + "_form_dhtmlxChat_message", self.settings.conf_form_message, self.form_message[ uid ]);
		

	}
	
	,form_user_properties : []
	,
	/**
	 * Description
	 * @method _form
	 * @param {} uid
	 * @return
	 */
	_form_user_properties: function (uid, callBackSuccessLogin) {
		var self = this,
			skin = self.skin;
			
		dhtmlx.skin = skin || "dhx_skyblue";
		

		self.form_user_properties[ uid ] = self.layout[uid].cells("c").attachForm(self.settings.conf_form_user_properties.template);
		//self.form[ uid ].setSkin(skin);
		
		self.form_user_properties[ uid ].attachEvent("onButtonClick", function(name){
			if(name == "proceed")
			{
				var hash = self.form_user_properties[ uid ].getFormData();
				var nick = hash[ "nick" ];
				var gender = hash[ "gender" ];
				self.online_person = hash;
				
				self.socket.Send( {
					type : 'new_username'// new_username, message, subscribe    -> mandatory
					,person : user_hash
					,message : ' '+user_hash["nick"]+' is online now'
					,client_id : $dhx.socket.getClientID()
				} );
				
				
				//if( callBackSuccessLogin ) callBackSuccessLogin();
			}
			
		});


		//$dhx.dhtmlx.prepareForm(uid + "_form_dhtmlxChat_user_properties", self.settings.conf_form_user_properties, self.form_user_properties[ uid ]);
		

	}

	,
	/**
	 * Description
	 * @method progressOn
	 * @param {} uid
	 * @return
	 */
	progressOn: function (uid) {
		var self = this;
		try {
			self.window[uid].progressOn();
		}
		catch (e) {};

		self.layout[uid].progressOn();
	}

	,
	/**
	 * Description
	 * @method progressOff
	 * @param {} uid
	 * @return
	 */
	progressOff: function (uid) {
		var self = this;
		try {
			self.window[uid].progressOff();
		}
		catch (e) {};

		self.layout[uid].progressOff();
	}

	,
	/**
	 * Description
	 * @method progressOnForm
	 * @param {} uid
	 * @return
	 */
	progressOnForm: function (uid) {
		var self = this;
		self.window_form[uid].progressOn();
		self.layout_form[uid].progressOn();
	}

	,
	/**
	 * Description
	 * @method progressOffForm
	 * @param {} uid
	 * @return
	 */
	progressOffForm: function (uid) {
		var self = this;
		self.window_form[uid].progressOff();
		self.layout_form[uid].progressOff();
	}

	/**
	 * Description
	 * @method init
	 * @param {} settings
	 * @return
	 */
	,
	init: function (settings) {
		var self = this;
		self.settings = settings;
	}

	
	
	
	,
	/**
	 * Description
	 * @method _setStatus
	 * @param {} m
	 * @return
	 */
	_setStatus: function (m) {
		self = this;
		document.getElementById("status_info").innerHTML = m;
	},
	/**
	 * Description
	 * @method _setStatusForm
	 * @param {} uid
	 * @param {} m
	 * @return
	 */
	_setStatusForm: function (uid, m) {
		self = this;
		document.getElementById("formbuilder_status_info_" + uid).innerHTML = m;
	}

	

	

	,
	/**
	 * Description
	 * @method _setStatusDataTransfer
	 * @param {} m
	 * @param {} isActive
	 * @return
	 */
	_setStatusDataTransfer: function (m, isActive) {
		self = this;
		dhtmlx.message({
			text: m
		});
		if (isActive) {
			document.getElementById("data_transfer_info").innerHTML = m;
			document.getElementById("data_transfer_info").style.backgroundImage = "url(" + self.icons_path + "network.gif)";
		}
		else {
			document.getElementById("data_transfer_info").innerHTML = m;
			document.getElementById("data_transfer_info").style.backgroundImage = "url(" + self.icons_path + "network-accept.png)";
		}
	}

	,
	/**
	 * Description
	 * @method _setStatusSocket
	 * @param {} m
	 * @param {} isOffline
	 * @return
	 */
	_setStatusSocket: function (m, isOffline) {
		self = this;
		dhtmlx.message({
			text: m
		});
		document.getElementById("socket_info").innerHTML = "socket: " + m;
		document.getElementById("socket_info").style.backgroundImage = "url(" + self.icons_path + "socket.gif)";
		if (isOffline)
			document.getElementById("socket_info").style.backgroundImage = "url(" + self.icons_path + "socket_disconnected.png)";
	}

	,
	/**
	 * Description
	 * @method _setStatusDataTransferForm
	 * @param {} uid
	 * @param {} m
	 * @param {} isActive
	 * @return
	 */
	_setStatusDataTransferForm: function (uid, m, isActive) {
		self = this;
		dhtmlx.message({
			text: m
		});
		if (isActive) {
			document.getElementById("formbuilder_data_transfer_info_" + uid).innerHTML = m;
			document.getElementById("formbuilder_data_transfer_info_" + uid).style.backgroundImage = "url(" + self.icons_path + "network.gif)";
		}
		else {
			document.getElementById("formbuilder_data_transfer_info_" + uid).innerHTML = m;
			document.getElementById("formbuilder_data_transfer_info_" + uid).style.backgroundImage = "url(" + self.icons_path + "network-accept.png)";
		}
	}

	,
	/**
	 * Description
	 * @method _setStatusUser
	 * @param {} m
	 * @param {} ok
	 * @return
	 */
	_setStatusUser: function (m, ok) {
		self = this;
		if (typeof ok === 'undefined') {
			ok = true;
		}
		document.getElementById("user_info").getElementsByTagName("span")[0].innerHTML = m;
		if (ok) {
			document.getElementById("user_info_status").src = "" + self.icons_path + "online.png";
			dhtmlx.message({
				text: m
			});
		}
		else {
			document.getElementById("user_info_status").src = "" + self.icons_path + "offline.png";
			dhtmlx.message({
				type: "error",
				text: m
			});
		}
	}
	
}
