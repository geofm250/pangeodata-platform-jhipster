package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Requirement.
 */
@Document(collection = "requirement")
public class Requirement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("links")
    private String links;

    @Field("country")
    private String country;

    @Field("product")
    private String product;

    @Field("type")
    private String type;

    @Field("input")
    private String input;

    @Field("form")
    private String form;

    @Field("active")
    private String active;

    @Field("created_at")
    private String createdAt;

    @Field("updated_at")
    private String updatedAt;

    @Field("display_order")
    private String displayOrder;

    @Field("display_download_link")
    private String displayDownloadLink;

    @Field("i_cover_name")
    private String iCoverName;

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

    public Requirement name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLinks() {
        return links;
    }

    public Requirement links(String links) {
        this.links = links;
        return this;
    }

    public void setLinks(String links) {
        this.links = links;
    }

    public String getCountry() {
        return country;
    }

    public Requirement country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProduct() {
        return product;
    }

    public Requirement product(String product) {
        this.product = product;
        return this;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getType() {
        return type;
    }

    public Requirement type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getInput() {
        return input;
    }

    public Requirement input(String input) {
        this.input = input;
        return this;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getForm() {
        return form;
    }

    public Requirement form(String form) {
        this.form = form;
        return this;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public String getActive() {
        return active;
    }

    public Requirement active(String active) {
        this.active = active;
        return this;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public Requirement createdAt(String createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public Requirement updatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getDisplayOrder() {
        return displayOrder;
    }

    public Requirement displayOrder(String displayOrder) {
        this.displayOrder = displayOrder;
        return this;
    }

    public void setDisplayOrder(String displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getDisplayDownloadLink() {
        return displayDownloadLink;
    }

    public Requirement displayDownloadLink(String displayDownloadLink) {
        this.displayDownloadLink = displayDownloadLink;
        return this;
    }

    public void setDisplayDownloadLink(String displayDownloadLink) {
        this.displayDownloadLink = displayDownloadLink;
    }

    public String getiCoverName() {
        return iCoverName;
    }

    public Requirement iCoverName(String iCoverName) {
        this.iCoverName = iCoverName;
        return this;
    }

    public void setiCoverName(String iCoverName) {
        this.iCoverName = iCoverName;
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
        Requirement requirement = (Requirement) o;
        if (requirement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), requirement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Requirement{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", links='" + getLinks() + "'" +
            ", country='" + getCountry() + "'" +
            ", product='" + getProduct() + "'" +
            ", type='" + getType() + "'" +
            ", input='" + getInput() + "'" +
            ", form='" + getForm() + "'" +
            ", active='" + getActive() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", displayOrder='" + getDisplayOrder() + "'" +
            ", displayDownloadLink='" + getDisplayDownloadLink() + "'" +
            ", iCoverName='" + getiCoverName() + "'" +
            "}";
    }
}
