package mongodbConnectivity;

import java.sql.Time;
import java.util.List;
import java.net.UnknownHostException;
import java.util.Set;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;



public class DbConnectivity {

	

	
public static void main(String[] args) throws Exception {
    	
    	try
    	{
	    	// The Firefox driver supports javascript  
	        WebDriver driver = new FirefoxDriver();
	    		
	        // Go to the Google Suggest home page
	        driver.get("http://qae-ng.cengage.com/static/nb/login.html");
	        
	        // Enter the query string "Cheese"
	        WebElement usernameQuery = driver.findElement(By.id("_username_id"));
	        usernameQuery.sendKeys("sanat.chugh@cengage.com");
	        
	        // Entry into Username
	        WebElement passwordQuery = driver.findElement(By.id("_password_id"));
	        passwordQuery.sendKeys("Cengage1");
	        
	        WebElement goButton = driver.findElement(By.className("goButton"));
	        goButton.click();
	        
	        Thread.sleep(5000);
	        
	        WebElement link1 = driver.findElement(By.xpath(".//*[@id='original_wrapper']/div/div[4]/a"));
	        link1.click();
	        
	        Thread.sleep(10000);
	        
	        
	        //WebElement searchButton = driver.findElement(By.id("app_Search"));
	        //searchButton.click();
	        
	        List <WebElement> mindapps = driver.findElements(By.className("nb_dockItem"));
	        //System.out.println(mindapps.size());
	        String iframeId, mindappElement;
	        
	        //String idSearchApp = mindapps.get(0).getAttribute("id");
	        
	        //mindapps.get(0).click();
	        
	        
	        for(int i=0;i < mindapps.size(); i++)
	        {
	        	String idWebElement = mindapps.get(i).getAttribute("id");
	        	//System.out.println(idWebElement);
	        	if(idWebElement.equals(new String("app_Search")))  //fooString1.equals(fooString2);
	        	{
	        		mindappElement="Search ";
	        		iframeId = "none";
	        		mindapps.get(i).click();
	        		Thread.sleep(3000);
	        		//System.out.println("clicked search!!");
	        	}
	        	
	        	if(idWebElement.equals(new String("app_full_book")))
	        	{
	        		try
	        		{
	        			mindappElement="Full Book ";
		        		iframeId = "37_NB_Dock_IFrame";
		        		long startTime = System.currentTimeMillis();
		        		mindapps.get(i).click();
		        		WebDriverWait wait = new WebDriverWait(driver, 15);
		        		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("37_NB_App_DockItem")));
		        		//System.out.println(driver.findElement(By.id("37_NB_Dock_IFrame")));
		        		//driver.switchTo().defaultContent();
		        		driver.switchTo().frame("37_NB_Dock_IFrame");//"37_NB_Dock_IFrame"
//		        		System.out.println(driver.getTitle());
		        		
		        		wait.until(ExpectedConditions.elementToBeClickable(By.id("help")));
		        		WebElement e = driver.findElement(By.id("help"));
		        		long endTime = System.currentTimeMillis();
		        		System.out.println("Full Book load time," + (endTime-startTime));
		        		e.click();
		        		driver.switchTo().defaultContent();
		        		Thread.sleep(3000);
	        		}
	        		catch(Exception e)
	        		{
	        			System.out.println("Full Book Load Time, 15+");
	        		}
	        		
	        	}
	        	
	        	if(idWebElement.equals(new String("app_glossary")))
	        	{
	        		try
	        		{
	        			mindappElement="Glossary";
		        		iframeId = "299_NB_Dock_IFrame";
		        		long startTime = System.currentTimeMillis();
		        		mindapps.get(i).click();
		        		WebDriverWait wait = new WebDriverWait(driver, 15);
		        		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("299_NB_App_DockItem")));
		        		//System.out.println(driver.findElement(By.id("37_NB_Dock_IFrame")));
		        		
		        		driver.switchTo().frame("299_NB_Dock_IFrame");//"37_NB_Dock_IFrame"
//		        		System.out.println(driver.getTitle());
		        		
		        		wait.until(ExpectedConditions.elementToBeClickable(By.id("A")));
		        		WebElement e = driver.findElement(By.id("A"));
		        		long endTime = System.currentTimeMillis();
		        		System.out.println("Glossary load time," + (endTime-startTime));
		        		e.click();
		        		driver.switchTo().defaultContent();
		        		Thread.sleep(3000);
	        		}
	        		catch(Exception e)
	        		{
	        			System.out.println("Glossary load time, 15+");
	        		}
	        		
	        	}
	        	
	        	
	        	if(idWebElement.equals(new String("app_view_flash_cards")))
	        	{
	        		try
	        		{
	        			mindappElement="Flash Cards";
		        		iframeId = "18_NB_Dock_IFrame";
		        		long startTime = System.currentTimeMillis();
		        		mindapps.get(i).click();
		        		WebDriverWait wait = new WebDriverWait(driver, 15);
		        		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("18_NB_App_DockItem")));
		        		//System.out.println(driver.findElement(By.id("37_NB_Dock_IFrame")));
		        		
		        		driver.switchTo().frame("18_NB_Dock_IFrame");//"37_NB_Dock_IFrame"
//		        		System.out.println(driver.getTitle());
		        		
		        		wait.until(ExpectedConditions.elementToBeClickable(By.id("next-card")));
		        		WebElement e = driver.findElement(By.id("next-card"));
		        		long endTime = System.currentTimeMillis();
		        		System.out.println("Flashcards load time," + (endTime-startTime));
		        		e.click();
		        		driver.switchTo().defaultContent();
		        		Thread.sleep(3000);
	        		}
	        		catch(Exception e)
	        		{
	        			System.out.println("Flashcards load time, 15+");
	        		}
	        		
	        	}
	        	
	        	if(idWebElement.equals(new String("app_selected_text")))
	        	{
	        		try
	        		{
	        			mindappElement="Merriam-Webster's Dictionary";
		        		iframeId = "165_NB_Dock_IFrame";
		        		long startTime = System.currentTimeMillis();
		        		mindapps.get(i).click();
		        		WebDriverWait wait = new WebDriverWait(driver, 15);
		        		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("165_NB_App_DockItem")));
		        		//System.out.println(driver.findElement(By.id("37_NB_Dock_IFrame")));
		        		
		        		driver.switchTo().frame("165_NB_Dock_IFrame");//"37_NB_Dock_IFrame"
//		        		System.out.println(driver.getTitle());
		        		
		        		wait.until(ExpectedConditions.elementToBeClickable(By.id("mtdict-logo")));
		        		WebElement e = driver.findElement(By.id("mtdict-logo"));
		        		long endTime = System.currentTimeMillis();
		        		System.out.println("Dictionary load time," + (endTime-startTime));
		        		e.click();
		        		driver.switchTo().defaultContent();
		        		Thread.sleep(3000);
	        		}
	        		catch(Exception e)
	        		{
	        			System.out.println("Dictionary load time, 15+");
	        		}
	        		
	        	}
	        	
	        	if(idWebElement.equals(new String("app_MyNotes")))
	        	{
	        		try
	        		{
	        			mindappElement="My Notes";
		        		iframeId = "2380_NB_Dock_IFrame";
		        		long startTime = System.currentTimeMillis();
		        		mindapps.get(i).click();
		        		WebDriverWait wait = new WebDriverWait(driver, 15);
		        		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("2380_NB_App_DockItem")));
		        		//System.out.println(driver.findElement(By.id("37_NB_Dock_IFrame")));
		        		
		        		driver.switchTo().frame("2380_NB_Dock_IFrame");//"37_NB_Dock_IFrame"
//		        		System.out.println(driver.getTitle());
		        		
		        		wait.until(ExpectedConditions.elementToBeClickable(By.id("203")));
		        		WebElement e = driver.findElement(By.id("203"));
		        		long endTime = System.currentTimeMillis();
		        		System.out.println("My Notes load time," + (endTime-startTime));
		        		e.click();
		        		driver.switchTo().defaultContent();
		        		Thread.sleep(3000);
	        		}
	        		catch(Exception e)
	        		{
	        			System.out.println("My Notes load time, 15+");
	        		}
	        		
	        	}
	        	
	        }
	        driver.quit();
    	}
    	catch(Exception e)
    	{
    		System.out.println("in catch!!");
    	}
    	
    	
    }
	
	
	

}
