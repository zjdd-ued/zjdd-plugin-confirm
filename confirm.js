define( "Confirm" , [ "Base" , "Panel" , "DataView" , "EventBind" ] , function( Base , Panel , DV , EB ){
    var tool ,
        Confirm = Base.extend( function( opt ){
            this._confirmConfig    = {
                _opt        : $.extend( {} , opt ) 
            }
            this.panel      = new Panel( "zjddConfirmTmpContainerTemplate" , {} , null , {
                width       : "75%"
            } );
            this.show( opt );
        } , {
            __confirmConfig : {
                optDefault  : {
                    cancelTitle     : "取消" ,
                    sureTitle       : "确定"
                }
            } ,
            show            : function( opt ){
                opt     = $.extend( {} , this.__confirmConfig.optDefault , opt );
                tool.makeupOpt( opt );
                if( !this.dataView ){
                    this.dataView   = tool.getConfirmDataView.call( this , opt );
                } else {
                    this.dataView.set( opt );
                }
                return this;
            } ,
            hide        : function(){
                this.panel.hide();
                return this;
            }
        } );
    tool    = {
        getConfirmDataView : function( opt ){
            var _self   = this ,
                _dv     = new DV( "zjddConfirmContainerTemplate" , opt );
            this.panel.$content.html( _dv.getDataModal() );
            new EB( {
                "a.cancel::tap"     : function(){
                    if( typeof opt.cancel === "function" ){
                        opt.cancel();
                    }
                    _self.hide();
                } ,
                "a.sure::tap"     : function(){
                    if( typeof opt.sure === "function" ){
                        if( opt.sure() !== false ){
                            _self.hide();
                        };
                    }
                }
            } , this.panel.$content );
            return _dv;
        } ,
        makeupOpt   : function( opt ){
            if( opt.sure ){
                opt[ "footerClass" ]    = "btn-is-2";
            }
        }
    }
    return Confirm;
} );