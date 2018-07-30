package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A File.
 */
@Document(collection = "file")
public class File implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("url")
    private String url;

    @Field("order_file_id")
    private String orderFileId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public File url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getOrderFileId() {
        return orderFileId;
    }

    public File orderFileId(String orderFileId) {
        this.orderFileId = orderFileId;
        return this;
    }

    public void setOrderFileId(String orderFileId) {
        this.orderFileId = orderFileId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        File file = (File) o;
        if (file.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), file.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "File{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", orderFileId='" + getOrderFileId() + "'" +
            "}";
    }
}
