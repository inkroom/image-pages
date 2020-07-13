package cn.inkroom.image.download;

import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.config.SocketConfig;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

public class Tool {

    public static void main(String[] args) {

        Logger logger = LoggerFactory.getLogger("下载工具");

        int eachThreadCount = 300;//每个线程负责下载的最大文件数
// 文件保存目录
        File target = new File("/Users/apple/resources/image");
        //避开api请求频率限制，单位毫秒,https://developer.github.com/v3/#rate-limiting

//        创建下载客户端

        HttpClient client = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom().setConnectTimeout(3000).setConnectionRequestTimeout(3000).setSocketTimeout(6000).setSocketTimeout(60000).build())
                .setDefaultSocketConfig(SocketConfig.custom().setSoTimeout(60000).build()).build();

//        获取文件目录

        Info info = new Info(client);

        List<String> rootDirs = info.getRootDirs();


        logger.info("开始获取所有文件");

        List<String> fileList = new LinkedList<>();
//        拿到所有文件
        for (int i = 0; i < rootDirs.size(); i++) {

            fileList.addAll(info.getFiles(rootDirs.get(i)));

        }

//        List<String> fileList = new LinkedList<>();
//        for (int i = 0; i < 2813; i++) {
//            fileList.add(i+"");
//        }

        logger.info("获取到 {} 个文件，开始准备线程", fileList.size());

        CountDownLatch countDownLatch = new CountDownLatch((int) Math.ceil(fileList.size() / ((float) eachThreadCount)));

        logger.info("COUNT={}",countDownLatch.getCount());


        for (int i = 0; i < fileList.size(); i += eachThreadCount) {
            new DownloadThread(client, fileList.subList(i, Math.min(fileList.size(), i + eachThreadCount)), target, countDownLatch).start();
            logger.info("i={}",i);
        }

//        CountDownLatch countDownLatch = new CountDownLatch(1);
//        new DownloadThread(client, Collections.singletonList("1600X800/1506588475343 - 1600x900.jpg"), target, countDownLatch).start();


        try {
            countDownLatch.await();
            logger.info("[下载完成，请查看错误日志是否有文件下载失败]");

        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }


}
