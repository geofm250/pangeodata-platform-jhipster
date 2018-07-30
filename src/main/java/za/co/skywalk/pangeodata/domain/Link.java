package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Link.
 */
@Document(collection = "link")
public class Link implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("requirement_id")
    private String requirementId;

    @Field("url")
    private String url;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRequirementId() {
        return requirementId;
    }

    public Link requirementId(String requirementId) {
        this.requirementId = requirementId;
        return this;
    }

    public void setRequirementId(String requirementId) {
        this.requirementId = requirementId;
    }

    public String getUrl() {
        return url;
    }

    public Link url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
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
        Link link = (Link) o;
        if (link.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), link.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Link{" +
            "id=" + getId() +
            ", requirementId='" + getRequirementId() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
