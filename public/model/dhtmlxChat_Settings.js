var dhtmlxChat_Settings = {
    "text_labels": {
        "main_window_title": "dhtmlxNodeChat"
    },
    "globalSkin": "dhx_skyblue",
	"globalImgPath" : "",
    "conf_window": {
        "image_path": "",
        "viewport": "body",
        "left": 100,
        "top": 5,
        "width": 1200,
        "height": 550,
        "enableAutoViewport": true,
        "icon": "form.png",
        "icon_dis": "form.png"
    }
	
	 ,"conf_window_login": {
        "image_path": "",
        "viewport": "body",
        "left": 100,
        "top": 5,
        "width": 360,
        "height": 210,
        "enableAutoViewport": true,
        "icon": "form.png",
        "icon_dis": "form.png"
    }
	
	,
    "conf_toolbar": {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "new_form",
                "text": "create new form",
                "img": "add_form.png",
                "img_disabled": "add_form_dis.png"
				,disabled : true
            },{
                id: "new_s1",
                type: "separator"
            },
			{
                "type": "button",
                "id": "form_builder",
                "text": "build form",
                "img": "builder.png",
                "img_disabled": "builder_dis.png"
				,disabled : true
            },{
                "type": "button",
                "id": "view_entries",
                "text": "view entries",
                "img": "entries.png",
                "img_disabled": "entries_dis.png"
				,disabled : true
            },
			{
                "type": "button",
                "id": "delete_form",
                "text": "delete selected form",
                "img": "delete.png",
                "img_disabled": "delete_dis.png"
				,disabled : true
            },{
                id: "new_s2",
                type: "separator"
            },
			{
                "type": "button",
                "id": "print_form_list",
                "text": "print list of form",
                "img": "print.png",
                "img_disabled": "print_dis.png"
				,disabled : true
            },{
                id: "new_s3",
                type: "separator"
            },
			{
                "type": "button",
                "id": "library_field_maker",
                "text": "library field maker",
                "img": "library_field_maker.png",
                "img_disabled": "library_field_maker.png"
				//,disabled : true
            }
        ]
    },
	
    "conf_layout": {
        parent: "",
		"pattern": "3L",
		cells: [
					{id: "a", text: "Navigation", width: 100, header: false, fix_size: [true, null]},
					{id: "b", text: "online users", width: 270},
					{id: "c", text: "user settings", height: 180, width: 270, collapse: true}
		]
    }
	
	,conf_tabbar : {
		//parent: "a_tabbar",
		image_path: "",
		skin: "dhx_skyblue",
		tabs: []
    }
	
	
    ,"conf_form": {
        "template": [
			{type: "settings", position: "label-left", labelWidth: 130, inputWidth: 120},
				
		]
    }
	
	,"conf_form_login": {
        "template": [
			{type: "settings", position: "label-left", labelWidth: 130, inputWidth: 120},
			{type: "fieldset", label: "Welcome", inputWidth: 340, list:[
				{type: "input", name:"nick", label: "Nick name", value: ""},
				{type: "select", name:"gender", label: "Gender", options:[
						{text: "male", value: "male"},
						{text: "female", value: "female"}
					]},
				{type: "button", name:"proceed", value: "proceed"}
			]}
		]
    }
	
	,conf_form_message: {
        "template": [
			{type: "settings", position: "label-left", labelWidth: 0, inputWidth: 120},
			{type: "input", rows : "5", name:"message", label: "", value: "", style:"width:885px;height:90px;"},
			{type: "button", name:"send", value: "send message", width : 850}
		]
    }
	
	,"conf_form_user_properties": {
        "template": [
			{type: "settings", position: "label-left", labelWidth: 130, inputWidth: 120},
			{type: "input", name:"nick", label: "Nick name", value: ""},
			{type: "select", name:"gender", label: "Gender", options:[
					{text: "male", value: "male"},
					{text: "female", value: "female"}
				]},
			{type: "button", name:"proceed", value: "proceed"}
		]
    }
	
	,conf_dataView_public_messages : { 
		settings : {
			type: {
				template: "#avatar# #nick# -  #message#",
				padding: 5,
				height: 40,
				width: 850
			},
			//drag: true,
			//select: true
		}, 
		
		data : [
			
		]
	}
	
	
	,conf_dataView_online_users : { 
		settings : {
			type: {
				template: "#avatar# #nick# - #gender#",
				padding: 5,
				height: 20,
				width: 240
			},
			//drag: true,
			//select: true
		}, 
		
		data : [
		]
	}
	
	
	
	
   
};
dhtmlxChat.init(dhtmlxChat_Settings);