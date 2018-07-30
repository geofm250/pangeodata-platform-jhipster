package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderFile.
 */
@Document(collection = "order_file")
public class OrderFile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("local_files")
    private String localFiles;

    @Field("files")
    private String files;

    @Field("links")
    private String links;

    @Field("display_links")
    private String displayLinks;

    @Field("i_cover_name")
    private String iCoverName;

    @Field("order_id")
    private String orderId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public OrderFile name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocalFiles() {
        return localFiles;
    }

    public OrderFile localFiles(String localFiles) {
        this.localFiles = localFiles;
        return this;
    }

    public void setLocalFiles(String localFiles) {
        this.localFiles = localFiles;
    }

    public String getFiles() {
        return files;
    }

    public OrderFile files(String files) {
        this.files = files;
        return this;
    }

    public void setFiles(String files) {
        this.files = files;
    }

    public String getLinks() {
        return links;
    }

    public OrderFile links(String links) {
        this.links = links;
        return this;
    }

    public void setLinks(String links) {
        this.links = links;
    }

    public String getDisplayLinks() {
        return displayLinks;
    }

    public OrderFile displayLinks(String displayLinks) {
        this.displayLinks = displayLinks;
        return this;
    }

    public void setDisplayLinks(String displayLinks) {
        this.displayLinks = displayLinks;
    }

    public String getiCoverName() {
        return iCoverName;
    }

    public OrderFile iCoverName(String iCoverName) {
        this.iCoverName = iCoverName;
        return this;
    }

    public void setiCoverName(String iCoverName) {
        this.iCoverName = iCoverName;
    }

    public String getOrderId() {
        return orderId;
    }

    public OrderFile orderId(String orderId) {
        this.orderId = orderId;
        return this;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
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
        OrderFile orderFile = (OrderFile) o;
        if (orderFile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderFile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderFile{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", localFiles='" + getLocalFiles() + "'" +
            ", files='" + getFiles() + "'" +
            ", links='" + getLinks() + "'" +
            ", displayLinks='" + getDisplayLinks() + "'" +
            ", iCoverName='" + getiCoverName() + "'" +
            ", orderId='" + getOrderId() + "'" +
            "}";
    }
}
