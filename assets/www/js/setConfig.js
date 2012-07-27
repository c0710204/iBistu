 
(function(){
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFilesystem, fail);
	
	function getFilesystem(fs){
		console.log("root.name is -->"+fs.root.name);
		fs.root.getFile("readme.txt", {create: true, exclusive: false}, getFileEntry, fail);
	}
	
	function getFileEntry(fileEntry){
		
		fileEntry.createWriter(function(writer){
			console.log("start to write");
			writer.write("I write something in readme.txt");
		},
		fail);
		
		fileEntry.file(function(file){
			console.log("start to read");
			console.log("fullpath is --> "+file.fullPath);
			var reader = new FileReader();
			
			reader.onloadend = function(){
				console.log("result is " + reader.result);
			}
			
			reader.readAsText(file);
			
		},
		fail);
	}
	
	function fail(){
		console.log("fail..............");
	}
	
})();

















