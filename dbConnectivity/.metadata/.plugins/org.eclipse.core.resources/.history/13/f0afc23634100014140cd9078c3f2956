package mongodbConnectivity;

import java.net.UnknownHostException;
import java.util.Set;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class DbConnectivity {

	public static void main(String[] args) throws UnknownHostException {
		MongoClient mongoclient = new MongoClient("localhost", 27017);
		
		DB db = mongoclient.getDB( "mydb" );
		
		BasicDBObject doc = new BasicDBObject("name","Aayush");
		doc.append("class",10);
		BasicDBObject doc1 = new BasicDBObject("name","Sameer");
		doc.append("class",20);
		
		
		//db.createCollection("newCollection", doc);
		
//		Set<String> colls = db.getCollectionNames();
//		for(String s : colls)
//		{
//			System.out.println(s);
//		}
		
		DBCollection dbnewCollection = db.getCollection("newCollection");

//		for(int i=0; i<10; i++)
//		{
//			dbnewCollection.insert(new BasicDBObject("i", 5));
//		}
		//System.out.println(dbnewCollection.getCount());
		
		
		BasicDBObject findDoc = new BasicDBObject("i", 5);
		
		DBCursor curr = dbnewCollection.find(findDoc);
		System.out.println(curr.next());
		
//		try {
//			while(curr.hasNext())
//			{
//				System.out.println(curr.next());
//			}
//		} 
//		finally {
//			curr.close();
//		}
		
		
		
		//dbnewCollection.insert(doc1);
		//System.out.println(dbnewCollection);
		
//		DBObject docz = dbnewCollection.findOne();
//		System.out.println(docz);
		
		System.out.println("Done!!");
		mongoclient.close();
	}

}
