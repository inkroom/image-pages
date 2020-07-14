package cn.inkroom.image.download;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
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
    private OkHttpClient client;

    private List<String> urls;
    /**
     * 下载文件存放路径，可能会在该路径下继续新建子文件夹
     */
    private File target;

    public DownloadThread(OkHttpClient client, List<String> urls, File target, CountDownLatch latch) {
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

                Request request = new Request.Builder().url("https://raw.githubusercontent.com/inkroom/image/master/" + URLEncoder.encode(urls.get(i), Charset.defaultCharset())).get().build();

                Call call = client.newCall(request);

                Response response = call.execute();

                if (response.code() == 200) {
                    //保存
                    IOUtils.write(response.body().bytes(), out);
                }


                response.close();
            } catch (Exception e) {
                logger.error("[下载失败]-{}-{}", urls.get(i), e.getMessage());
            }
        }
        logger.info("下载了{}个文件", urls.size());
        latch.countDown();

    }
}
