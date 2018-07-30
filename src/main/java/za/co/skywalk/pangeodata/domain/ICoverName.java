package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ICoverName.
 */
@Document(collection = "i_cover_name")
public class ICoverName implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("requirement_id")
    private String requirementId;

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

    public ICoverName name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRequirementId() {
        return requirementId;
    }

    public ICoverName requirementId(String requirementId) {
        this.requirementId = requirementId;
        return this;
    }

    public void setRequirementId(String requirementId) {
        this.requirementId = requirementId;
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
        ICoverName iCoverName = (ICoverName) o;
        if (iCoverName.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), iCoverName.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ICoverName{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", requirementId='" + getRequirementId() + "'" +
            "}";
    }
}
