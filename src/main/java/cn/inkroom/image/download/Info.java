package cn.inkroom.image.download;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.LinkedList;
import java.util.List;

/**
 * 获取仓库信息
 */
public class Info {

    private Logger logger = LoggerFactory.getLogger(getClass());

    private OkHttpClient client;


    public Info(OkHttpClient client) {
        this.client = client;
    }

    /**
     * 获取最顶级文件夹
     *
     * @return
     */
    public List<String> getRootDirs() {

        HttpGet rootGet = new HttpGet("https://api.github.com/repos/inkroom/image/contents");


        try {

            Request request = new Request.Builder().url("https://api.github.com/repos/inkroom/image/contents").get().build();


            Call call = client.newCall(request);

            Response response = call.execute();


            if (response.code() == 200) {

                JsonArray jsonArray = new JsonParser().parse(response.body().string()).getAsJsonArray();

                List<String> list = new LinkedList<>();

                jsonArray.forEach(jsonElement -> {
                    JsonObject el = jsonElement.getAsJsonObject();
                    if (el.get("type").getAsString().equals("dir")) {
                        list.add(el.get("path").getAsString());
                    }
                });

                response.close();
                return list;

            } else {
                logger.error("[仓库信息] - 获取顶级目录失败，状态码：「{}」，返回数据：{}", response.code(), response.body().string());
            }
            response.close();
        } catch (Exception e) {
            throw new RuntimeException("获取文件夹目录失败", e);
        }

        throw new RuntimeException("获取文件夹目录失败");

    }

    public List<String> getFiles(String dir) {
        HttpGet rootGet = new HttpGet("https://api.github.com/repos/inkroom/image/contents/" + dir);
        try {

            Request request = new Request.Builder().url("https://api.github.com/repos/inkroom/image/contents/" + dir).get().build();

            Call call = client.newCall(request);


            Response response = call.execute();
            logger.info("[仓库信息] - 开始获取 {} 下的文件", dir);

            if (response.code() == 200) {

                JsonArray jsonArray = new JsonParser().parse(response.body().string()).getAsJsonArray();

                List<String> list = new LinkedList<>();

                jsonArray.forEach(jsonElement -> {
                    JsonObject el = jsonElement.getAsJsonObject();
                    if (el.get("type").getAsString().equals("file")) {
                        list.add(el.get("path").getAsString());
                    }
                });

                return list;

            } else {
                logger.error("[仓库信息] - 获取「{}」下的文件失败，状态码：「{}」，返回数据：{}", dir, response.code(), response.body().string());
            }
        } catch (Exception e) {
            throw new RuntimeException("获取文件失败", e);
        }

        throw new RuntimeException("获取文件失败");

    }


}
