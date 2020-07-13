package cn.inkroom.image.download;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * 负责下载部分文件
 */
public class DownloadThread extends Thread {

    private Logger logger = LoggerFactory.getLogger(getClass());
    private CountDownLatch latch;//用于通信
    private HttpClient client;

    private List<String> urls;
    /**
     * 下载文件存放路径，可能会在该路径下继续新建子文件夹
     */
    private File target;

    public DownloadThread(HttpClient client, List<String> urls, File target, CountDownLatch latch) {
        this.client = client;
        this.urls = urls;
        this.target = target;
        this.latch = latch;

        logger.info("接收{}个文件", urls.size());
    }

    public void run() {

        for (int i = 0; i < urls.size(); i++) {

            //保存位置
            File saveFile = new File(this.target, urls.get(i));
            if (!saveFile.getParentFile().exists() && !saveFile.getParentFile().mkdirs()) {
                logger.error("文件夹[{}]创建失败", saveFile.getParent());
                continue;
            }
            logger.info("开始下载{}", urls.get(i));

            if (saveFile.exists() && saveFile.length() != 0) continue;

            try (FileOutputStream out = new FileOutputStream(saveFile)) {
                HttpGet get = new HttpGet("https://raw.githubusercontent.com/inkroom/image/master/" + URLEncoder.encode(urls.get(i), Charset.defaultCharset()));

                HttpResponse response = client.execute(get);



                HttpEntity entity = response.getEntity();

                if (response.getStatusLine().getStatusCode() == 200) {
                    //保存
                    IOUtils.write(EntityUtils.toByteArray(entity), out);
                }

                if (response instanceof CloseableHttpResponse){//关闭，以释放连接到连接池
                    ((CloseableHttpResponse) response).close();
                }

            } catch (Exception e) {
                logger.error("[下载失败]-{}-{}", urls.get(i), e.getMessage());
            }
        }
        logger.info("下载了{}个文件", urls.size());
        latch.countDown();

    }
}
