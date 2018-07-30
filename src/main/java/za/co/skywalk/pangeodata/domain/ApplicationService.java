package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ApplicationService.
 */
@Document(collection = "application_service")
public class ApplicationService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("application_service_id")
    private String applicationServiceId;

    @Field("order_id")
    private String orderId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApplicationServiceId() {
        return applicationServiceId;
    }

    public ApplicationService applicationServiceId(String applicationServiceId) {
        this.applicationServiceId = applicationServiceId;
        return this;
    }

    public void setApplicationServiceId(String applicationServiceId) {
        this.applicationServiceId = applicationServiceId;
    }

    public String getOrderId() {
        return orderId;
    }

    public ApplicationService orderId(String orderId) {
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
        ApplicationService applicationService = (ApplicationService) o;
        if (applicationService.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), applicationService.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ApplicationService{" +
            "id=" + getId() +
            ", applicationServiceId='" + getApplicationServiceId() + "'" +
            ", orderId='" + getOrderId() + "'" +
            "}";
    }
}
